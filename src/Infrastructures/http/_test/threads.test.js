const pool = require('../../database/postgres/pool')

const ThreadsTableTestHelper = require('../../../../tests//ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper')

const container = require('../../container')
const createServer = require('../createServer')

const {
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  STATUS_SUCCESS,
  STATUS_FAIL,
  ERR_MSG_CANNOT_CREATE_THREAD,
  ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_DATA_TYPE,
  FAKE_VALUE_GREATER_THAN_LIMIT,
  ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_TITLE_LIMIT,
  ERR_MSG_MISSING_TOKEN_AUTHENTICATION,
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_USERNAME,
  FAKE_COMMENT_ID
} = require('../../../Commons/utils/CommonConstanta')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')

describe('/threads endpoint', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await AuthenticationsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      const requestPayload = {
        title: FAKE_TITLE_THREAD,
        body: FAKE_BODY_THREAD
      }

      const server = await createServer(container)
      const { accessToken } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual(STATUS_SUCCESS)

      expect(responseJson.data.addedThread).toBeDefined()
      expect(responseJson.data.addedThread.id).toBeDefined()
      expect(responseJson.data.addedThread.title).toBeDefined()
      expect(responseJson.data.addedThread.owner).toBeDefined()
    })

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        body: FAKE_BODY_THREAD
      }

      const server = await createServer(container)
      const { accessToken } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_THREAD)
    })

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        title: [FAKE_TITLE_THREAD],
        body: FAKE_BODY_THREAD
      }

      const server = await createServer(container)
      const { accessToken } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_DATA_TYPE)
    })

    it('should response 400 when title contain more than 50 character', async () => {
      // Arrange
      const requestPayload = {
        title: FAKE_VALUE_GREATER_THAN_LIMIT,
        body: FAKE_BODY_THREAD
      }

      const server = await createServer(container)
      const { accessToken } = await AuthenticationsTableTestHelper.getAccessToken({ server })

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_TITLE_LIMIT)
    })

    it('should response 401 when no access token is provided', async () => {
      // Arrange
      const requestPayload = {
        title: FAKE_TITLE_THREAD,
        body: FAKE_BODY_THREAD
      }

      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(401)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_MISSING_TOKEN_AUTHENTICATION)
    })
  })

  describe('when POST /threads/{threadId}', () => {
    it('should response 200 with detail thread', async () => {
      await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
      await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
      await CommentsTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })

      const threadId = FAKE_ID_THREAD
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${threadId}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(200)
      expect(responseJson.status).toEqual(STATUS_SUCCESS)

      expect(responseJson.data).toBeDefined()
      expect(responseJson.data.thread).toBeDefined()
      expect(responseJson.data.thread.comments).toHaveLength(1)
    })

    it('should response 404 because thread does not exist', async () => {
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/threads/after24'
      })

      // Assert
      const responseJson = JSON.parse(response.payload)

      expect(response.statusCode).toEqual(404)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toBeDefined()
    })
  })
})
