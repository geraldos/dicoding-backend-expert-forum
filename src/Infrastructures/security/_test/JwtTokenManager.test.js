const Jwt = require('@hapi/jwt')
const InvariantError = require('../../../Commons/exceptions/InvariantError')
const { FAKE_USERNAME, MOCK_TOKEN } = require('../../../Commons/utils/CommonConstanta')
const JwtTokenManager = require('../JwtTokenManager')

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const payload = {
        username: FAKE_USERNAME
      }
      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => MOCK_TOKEN)
      }
      const jwtTokenManager = new JwtTokenManager(mockJwtToken)

      // Action
      const accessToken = await jwtTokenManager.createAccessToken(payload)

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY)
      expect(accessToken).toEqual(MOCK_TOKEN)
    })
  })

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      // Arrange
      const payload = {
        username: FAKE_USERNAME
      }
      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => MOCK_TOKEN)
      }
      const jwtTokenManager = new JwtTokenManager(mockJwtToken)

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken(payload)

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.REFRESH_TOKEN_KEY)
      expect(refreshToken).toEqual(MOCK_TOKEN)
    })
  })

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token)
      const accessToken = await jwtTokenManager.createAccessToken({ username: FAKE_USERNAME })

      // Action & Assert
      await expect(jwtTokenManager.verifyRefreshToken(accessToken))
        .rejects
        .toThrow(InvariantError)
    })

    it('should not throw InvariantError when refresh token verified', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token)
      const refreshToken = await jwtTokenManager.createRefreshToken({ username: FAKE_USERNAME })

      // Action & Assert
      await expect(jwtTokenManager.verifyRefreshToken(refreshToken))
        .resolves
        .not.toThrow(InvariantError)
    })
  })

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt.token)
      const accessToken = await jwtTokenManager.createAccessToken({ username: FAKE_USERNAME })

      // Action
      const { username: expectedUsername } = await jwtTokenManager.decodePayload(accessToken)

      // Action & Assert
      expect(expectedUsername).toEqual(FAKE_USERNAME)
    })
  })
})
