const pool = require('../../database/postgres/pool')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const container = require('../../container')
const createServer = require('../createServer')

const {
  ERR_MSG_CANNOT_CREATE_USER,
  ERR_MSG_CANNOT_CREATE_USER_BECAUSE_DATA_TYPE,
  ERR_MSG_CANNOT_CREATE_USER_BECAUSE_USERNAME_LIMIT,
  ERR_MSG_CANNOT_CREATE_USER_BECAUSE_RESTRICTED_CHARACTER,
  FAKE_USERNAME,
  FAKE_PASSWORD,
  FAKE_FULLNAME,
  STATUS_SUCCESS,
  STATUS_FAIL,
  FAKE_VALUE_GREATER_THAN_LIMIT,
  FAKE_USERNAME_WITH_WHITE_SPACE,
  FAKE_PASSWORD_SECRET,
  ERR_MSG_USERNAME_NOT_AVAILABLE
} = require('../../../Commons/utils/CommonConstanta')

describe('/users endpoint', () => {
  afterAll(async () => {
    await pool.end()
  })

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
  })

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      // Arrange
      const requestPayload = {
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD,
        fullname: FAKE_FULLNAME
      }
      // eslint-disable-next-line no-undef
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual(STATUS_SUCCESS)
      expect(responseJson.data.addedUser).toBeDefined()
    })

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        fullname: FAKE_FULLNAME,
        password: FAKE_PASSWORD
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_USER)
    })

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD,
        fullname: [FAKE_FULLNAME]
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_USER_BECAUSE_DATA_TYPE)
    })

    it('should response 400 when username more than 50 character', async () => {
      // Arrange
      const requestPayload = {
        username: FAKE_VALUE_GREATER_THAN_LIMIT,
        password: FAKE_PASSWORD,
        fullname: FAKE_FULLNAME
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_USER_BECAUSE_USERNAME_LIMIT)
    })

    it('should response 400 when username contain restricted character', async () => {
      // Arrange
      const requestPayload = {
        username: FAKE_USERNAME_WITH_WHITE_SPACE,
        password: FAKE_PASSWORD,
        fullname: FAKE_FULLNAME
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_CANNOT_CREATE_USER_BECAUSE_RESTRICTED_CHARACTER)
    })

    it('should response 400 when username unavailable', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: FAKE_USERNAME })
      const requestPayload = {
        username: FAKE_USERNAME,
        fullname: FAKE_FULLNAME,
        password: FAKE_PASSWORD_SECRET
      }
      const server = await createServer(container)

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual(STATUS_FAIL)
      expect(responseJson.message).toEqual(ERR_MSG_USERNAME_NOT_AVAILABLE)
    })
  })
})
