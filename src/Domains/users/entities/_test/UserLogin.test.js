const UserLogin = require('../UserLogin')

const {
  FAKE_USERNAME,
  FAKE_PASSWORD,
  ERR_LOGIN_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_LOGIN_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../../Commons/utils/CommonConstanta')

describe('UserLogin entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {
      username: FAKE_USERNAME
    }

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError(ERR_LOGIN_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      username: FAKE_USERNAME,
      password: 12345
    }

    // Action & Assert
    expect(() => new UserLogin(payload)).toThrowError(ERR_LOGIN_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should create UserLogin entities correctly', () => {
    // Arrange
    const payload = {
      username: FAKE_USERNAME,
      password: FAKE_PASSWORD
    }

    // Action
    const userLogin = new UserLogin(payload)

    // Assert
    expect(userLogin).toBeInstanceOf(UserLogin)
    expect(userLogin.username).toEqual(payload.username)
    expect(userLogin.password).toEqual(payload.password)
  })
})
