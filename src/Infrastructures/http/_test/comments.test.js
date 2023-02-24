const pool = require('../../database/postgres/pool')

const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests//ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper')

const container = require('../../container')
const createServer = require('../createServer')

const {
  FAKE_COMMENT_CONTENT,
  FAKE_ID_THREAD,
  STATUS_SUCCESS,
  STATUS_FAIL,
  ERR_MSG_CANNOT_CREATE_COMMENT,
  ERR_MSG_CANNOT_CREATE_COMMENT_BECAUSE_DATA_TYPE,
  FAKE_COMMENT_ID,
  ERR_MSG_THREAD_NOT_FOUND,
  ERR_MSG_CANNOT_ACCESS_COMMENT
} = require('../../../Commons/utils/CommonConstanta')

describe('/threads with comment', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and persisted comment', async () => {
      // Arrange
      const requestPayload = {
        content: FAKE_COMMENT_CONTENT
      }

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual(STATUS_SUCCESS)

      expect(responseJson.data).toBeDefined()
      expect(responseJson.data.addedComment).toBeDefined()
      expect(responseJson.data.addedComment.id).toBeDefined()
      expect(responseJson.data.addedComment.content).toBeDefined()
      expect(responseJson.data.addedComment.owner).toBeDefined()
    })

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {}

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_COMMENT)
    })

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        content: [FAKE_COMMENT_CONTENT]
      }

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_COMMENT_BECAUSE_DATA_TYPE)
    })

    it('should response 404 when threadId it does not have', async () => {
      // Arrange
      const requestPayload = {
        content: FAKE_COMMENT_CONTENT
      }

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}4/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(404)
      expect(responseJson.status).toEqual(STATUS_FAIL)

      expect(responseJson.message).toBeDefined()
      expect(responseJson.message).toEqual(ERR_MSG_THREAD_NOT_FOUND)
    })
  })

  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should response 200 and return status success', async () => {
      // Arrange
      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: commentId, owner: id })

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual(STATUS_SUCCESS)
    })

    it('should response 403 because someone try to delete comment that does not have', async () => {
      // Arrange
      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { id } = await AuthenticationsTableTestHelper.getAccessToken({ server, username: 'dino' })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: commentId, owner: id })

      const { accessToken } = await AuthenticationsTableTestHelper.getAccessToken({ server, username: 'Lai' })

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(403)
      expect(responseJson.status).toEqual(STATUS_FAIL)

      expect(responseJson.message).toBeDefined()
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_ACCESS_COMMENT)
    })

    it('should response 404 when threadId it does not have', async () => {
      // Arrange
      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: commentId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}4/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(404)
      expect(responseJson.message).toBeDefined()
    })
  })
})
