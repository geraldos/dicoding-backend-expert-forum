const ClientError = require('../ClientError')
const AuthorizationError = require('../AuthorizationError')

const {
  ERR_AUTHORIZATION_ERROR_SMALL,
  ERR_AUTHORIZATION_ERROR
} = require('../../utils/CommonConstanta')

describe('AuthorizationError', () => {
  it('should create AuthorizationError correctly', () => {
    const authenticationError = new AuthorizationError(ERR_AUTHORIZATION_ERROR_SMALL)

    expect(authenticationError).toBeInstanceOf(AuthorizationError)
    expect(authenticationError).toBeInstanceOf(ClientError)
    expect(authenticationError).toBeInstanceOf(Error)

    expect(authenticationError.statusCode).toEqual(403)
    expect(authenticationError.message).toEqual(ERR_AUTHORIZATION_ERROR_SMALL)
    expect(authenticationError.name).toEqual(ERR_AUTHORIZATION_ERROR)
  })
})
