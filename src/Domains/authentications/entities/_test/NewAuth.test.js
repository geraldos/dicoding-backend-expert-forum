const NewAuth = require('../NewAuth')

const {
  ACCESS_TOKEN_WITHOUT_UNDERSCORE,
  REFRESH_TOKEN,
  ERR_NEW_AUTH_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_NEW_AUTH_NOT_MEET_DATA_TYPE_SPECIFICATION,
  FAKE_BAD_INPUT_VALUE_THREAD
} = require('../../../../Commons/utils/CommonConstanta')

describe('NewAuth entities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      accessToken: ACCESS_TOKEN_WITHOUT_UNDERSCORE
    }

    // Action & Assert
    expect(() => new NewAuth(payload)).toThrowError(ERR_NEW_AUTH_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      accessToken: ACCESS_TOKEN_WITHOUT_UNDERSCORE,
      refreshToken: FAKE_BAD_INPUT_VALUE_THREAD
    }

    // Action & Assert
    expect(() => new NewAuth(payload)).toThrowError(ERR_NEW_AUTH_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should create NewAuth entities correctly', () => {
    // Arrange
    const payload = {
      accessToken: ACCESS_TOKEN_WITHOUT_UNDERSCORE,
      refreshToken: REFRESH_TOKEN
    }

    // Action
    const newAuth = new NewAuth(payload)

    // Assert
    expect(newAuth).toBeInstanceOf(NewAuth)
    expect(newAuth.accessToken).toEqual(payload.accessToken)
    expect(newAuth.refreshToken).toEqual(payload.refreshToken)
  })
})
