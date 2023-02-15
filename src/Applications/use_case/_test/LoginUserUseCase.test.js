const UserRepository = require('../../../Domains/users/UserRepository')
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager')
const PasswordHash = require('../../security/PasswordHash')
const LoginUserUseCase = require('../LoginUserUseCase')
const NewAuth = require('../../../Domains/authentications/entities/NewAuth')

const {
  FAKE_USERNAME,
  FAKE_PASSWORD,
  FAKE_ENCRYPTED,
  FAKE_OWNER_THREAD,
  ACCESS_TOKEN,
  REFRESH_TOKEN_UNDERSCORE
} = require('../../../Commons/utils/CommonConstanta')

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: FAKE_USERNAME,
      password: FAKE_PASSWORD
    }
    const mockedAuthentication = new NewAuth({
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN_UNDERSCORE
    })
    const mockUserRepository = new UserRepository()
    const mockAuthenticationRepository = new AuthenticationRepository()
    const mockAuthenticationTokenManager = new AuthenticationTokenManager()
    const mockPasswordHash = new PasswordHash()

    // Mocking
    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve(FAKE_ENCRYPTED))
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.accessToken))
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(mockedAuthentication.refreshToken))
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve(FAKE_OWNER_THREAD))
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve())

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash
    })

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload)

    // Assert
    expect(actualAuthentication).toEqual(new NewAuth({
      accessToken: ACCESS_TOKEN,
      refreshToken: REFRESH_TOKEN_UNDERSCORE
    }))
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith(FAKE_USERNAME)
    expect(mockPasswordHash.comparePassword)
      .toBeCalledWith(FAKE_PASSWORD, FAKE_ENCRYPTED)
    expect(mockUserRepository.getIdByUsername)
      .toBeCalledWith(FAKE_USERNAME)
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: FAKE_USERNAME, id: FAKE_OWNER_THREAD })
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: FAKE_USERNAME, id: FAKE_OWNER_THREAD })
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(mockedAuthentication.refreshToken)
  })
})
