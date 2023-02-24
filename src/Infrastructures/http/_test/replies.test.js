const pool = require('../../database/postgres/pool')

const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests//ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper')

const container = require('../../container')
const createServer = require('../createServer')

const {
  FAKE_REPLY_CONTENT,
  FAKE_ID_THREAD,
  FAKE_COMMENT_ID,
  STATUS_SUCCESS,
  STATUS_FAIL,
  ERR_MSG_CANNOT_CREATE_REPLY,
  ERR_MSG_CANNOT_CREATE_REPLY_BECAUSE_DATA_TYPE,
  ERR_MSG_COMMENT_NOT_FOUND_BELONG_THREAD,
  FAKE_REPLY_ID,
  ERR_MSG_CANNOT_ACCESS_REPLY
} = require('../../../Commons/utils/CommonConstanta')

describe('/thread with comment and replies', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
    await RepliesTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('when POST /threads/{threadId}/comments/{commentId}/replies', () => {
    it('should response 201 and persisted replies', async () => {
      // Arrange
      const requestPayload = {
        content: FAKE_REPLY_CONTENT
      }

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
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
      expect(responseJson.data.addedReply).toBeDefined()
      expect(responseJson.data.addedReply.id).toBeDefined()
      expect(responseJson.data.addedReply.content).toBeDefined()
      expect(responseJson.data.addedReply.owner).toBeDefined()
    })

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {}

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_REPLY)
    })

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        content: [FAKE_REPLY_CONTENT]
      }

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}/replies`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_REPLY_BECAUSE_DATA_TYPE)
    })

    it('should response 404 when threadId it does not have', async () => {
      // Arrange
      const requestPayload = {
        content: FAKE_REPLY_CONTENT
      }

      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments/${commentId}2/replies`,
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
      expect(responseJson.message).toEqual(ERR_MSG_COMMENT_NOT_FOUND_BELONG_THREAD)
    })
  })

  describe('when DELETE /threads/{threadId}/comments/{commentId}/replies/{replyId}', () => {
    it('should response 200 and return status success', async () => {
      // Arrange
      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const replyId = FAKE_REPLY_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: commentId, owner: id })
      await RepliesTableTestHelper.addReplies({ id: replyId, owner: id })

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
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
      const replyId = FAKE_REPLY_ID
      const { id } = await AuthenticationsTableTestHelper.getAccessToken({ server, username: 'dino' })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: commentId, owner: id })
      await RepliesTableTestHelper.addReplies({ id: replyId, owner: id })

      const { accessToken } = await AuthenticationsTableTestHelper.getAccessToken({ server, username: 'Lai' })

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(403)
      expect(responseJson.status).toEqual(STATUS_FAIL)

      expect(responseJson.message).toBeDefined()
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_ACCESS_REPLY)
    })

    it('should response 404 when threadId it does not have', async () => {
      // Arrange
      const server = await createServer(container)
      const threadId = FAKE_ID_THREAD
      const commentId = FAKE_COMMENT_ID
      const replyId = FAKE_REPLY_ID
      const { accessToken, id } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      await ThreadsTableTestHelper.addThread({ id: threadId, owner: id })
      await CommentsTableTestHelper.addComment({ id: commentId, owner: id })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}4/comments/${commentId}/replies/${replyId}`,
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
