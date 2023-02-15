const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager')
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase')

const {
  ERR_REFRESH_USE_CASE_NOT_CONTAIN_REFRESH_TOKEN,
  ERR_REFRESH_USE_CASE_PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION,
  SOME_REFRESH_TOKEN,
  FAKE_USERNAME,
  FAKE_OWNER_THREAD,
  SOME_NEW_ACCESS_TOKEN

} = require('../../../Commons/utils/CommonConstanta')

describe('RefreshAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {}
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({})

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError(ERR_REFRESH_USE_CASE_NOT_CONTAIN_REFRESH_TOKEN)
  })

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 1
    }
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({})

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError(ERR_REFRESH_USE_CASE_PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: SOME_REFRESH_TOKEN
    }
    const mockAuthenticationRepository = new AuthenticationRepository()
    const mockAuthenticationTokenManager = new AuthenticationTokenManager()
    // Mocking
    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: FAKE_USERNAME, id: FAKE_OWNER_THREAD }))
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(SOME_NEW_ACCESS_TOKEN))
    // Create the use case instace
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    })

    // Action
    const accessToken = await refreshAuthenticationUseCase.execute(useCasePayload)

    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload.refreshToken)
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: FAKE_USERNAME, id: FAKE_OWNER_THREAD })
    expect(accessToken).toEqual(SOME_NEW_ACCESS_TOKEN)
  })
})
