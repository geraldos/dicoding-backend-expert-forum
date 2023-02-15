const AuthenticationRepository = require('../AuthenticationRepository')

const { ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../../Commons/utils/CommonConstanta')

describe('AuthenticationRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const authenticationRepository = new AuthenticationRepository()

    // Action & Assert
    await expect(authenticationRepository.addToken('')).rejects.toThrowError(ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(authenticationRepository.checkAvailabilityToken('')).rejects.toThrowError(ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(authenticationRepository.deleteToken('')).rejects.toThrowError(ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  })
})
