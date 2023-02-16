const AuthenticationError = require('../AuthenticationError')
const ClientError = require('../ClientError')

const {
  ERR_AUTHENTICATION_ERROR_SMALL,
  ERR_AUTHENTICATION_ERROR
} = require('../../utils/CommonConstanta')

describe('AuthenticationError', () => {
  it('should create AuthenticationError correctly', () => {
    const authenticationError = new AuthenticationError(ERR_AUTHENTICATION_ERROR_SMALL)

    expect(authenticationError).toBeInstanceOf(AuthenticationError)
    expect(authenticationError).toBeInstanceOf(ClientError)
    expect(authenticationError).toBeInstanceOf(Error)

    expect(authenticationError.statusCode).toEqual(401)
    expect(authenticationError.message).toEqual(ERR_AUTHENTICATION_ERROR_SMALL)
    expect(authenticationError.name).toEqual(ERR_AUTHENTICATION_ERROR)
  })
})
