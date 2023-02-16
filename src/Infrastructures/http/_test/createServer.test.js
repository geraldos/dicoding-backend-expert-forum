const createServer = require('../createServer')

const {
  FAKE_USERNAME,
  FAKE_FULLNAME,
  FAKE_PASSWORD_SECRET,
  STATUS_ERROR,
  ERR_MSG_INTERNAL_SERVER_ERROR
} = require('../../../Commons/utils/CommonConstanta')

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    // Arrange
    const server = await createServer({})

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute'
    })

    // Assert
    expect(response.statusCode).toEqual(404)
  })

  it('should handle server error correctly', async () => {
    // Arrange
    const requestPayload = {
      username: FAKE_USERNAME,
      fullname: FAKE_FULLNAME,
      password: FAKE_PASSWORD_SECRET
    }
    const server = await createServer({}) // fake injection

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload
    })

    // Assert
    const responseJson = JSON.parse(response.payload)
    expect(response.statusCode).toEqual(500)
    expect(responseJson.status).toEqual(STATUS_ERROR)
    expect(responseJson.message).toEqual(ERR_MSG_INTERNAL_SERVER_ERROR)
  })
})
