const AuthenticationTokenManager = require('../AuthenticationTokenManager')

const { ERR_AUTHENTICATION_TOKEN_MANAGER } = require('../../../Commons/utils/CommonConstanta')

describe('AuthenticationTokenManager interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    // Arrange
    const tokenManager = new AuthenticationTokenManager()

    // Action & Assert
    await expect(tokenManager.createAccessToken('')).rejects.toThrowError(ERR_AUTHENTICATION_TOKEN_MANAGER)
    await expect(tokenManager.createRefreshToken('')).rejects.toThrowError(ERR_AUTHENTICATION_TOKEN_MANAGER)
    await expect(tokenManager.verifyRefreshToken('')).rejects.toThrowError(ERR_AUTHENTICATION_TOKEN_MANAGER)
    await expect(tokenManager.verifyAccessToken('')).rejects.toThrowError(ERR_AUTHENTICATION_TOKEN_MANAGER)
    await expect(tokenManager.getTokenHeader('')).rejects.toThrowError(ERR_AUTHENTICATION_TOKEN_MANAGER)
    await expect(tokenManager.decodePayload('')).rejects.toThrowError(ERR_AUTHENTICATION_TOKEN_MANAGER)
  })
})
