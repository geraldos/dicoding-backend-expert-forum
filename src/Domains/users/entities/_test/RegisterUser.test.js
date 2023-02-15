const RegisterUser = require('../RegisterUser')

const {
  FAKE_BAD_VALUE_USER,
  FAKE_VALUE_GREATER_THAN_LIMIT,
  FAKE_FULLNAME,
  FAKE_USERNAME,
  FAKE_USERNAME_WITH_WHITE_SPACE,
  ERR_REGISTER_USER_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_REGISTER_USER_NOT_MEET_DATA_TYPE_SPECIFICATION,
  ERR_REGISTER_USER_USERNAME_LIMIT_CHAR,
  ERR_REGISTER_USER_USERNAME_RESTRICTED_CHARACTER
} = require('../../../../Commons/utils/CommonConstanta')

describe('a RegisterUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: FAKE_BAD_VALUE_USER,
      password: FAKE_BAD_VALUE_USER
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(ERR_REGISTER_USER_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      username: 123,
      fullname: true,
      password: FAKE_BAD_VALUE_USER
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(ERR_REGISTER_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should throw error when username contains more than 50 character', () => {
    // Arrange
    const payload = {
      username: FAKE_VALUE_GREATER_THAN_LIMIT,
      fullname: FAKE_FULLNAME,
      password: FAKE_BAD_VALUE_USER
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(ERR_REGISTER_USER_USERNAME_LIMIT_CHAR)
  })

  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: FAKE_USERNAME_WITH_WHITE_SPACE,
      fullname: FAKE_USERNAME,
      password: FAKE_BAD_VALUE_USER
    }

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(ERR_REGISTER_USER_USERNAME_RESTRICTED_CHARACTER)
  })

  it('should create registerUser object correctly', () => {
    // Arrange
    const payload = {
      username: FAKE_USERNAME,
      fullname: FAKE_FULLNAME,
      password: FAKE_BAD_VALUE_USER
    }

    // Action
    const { username, fullname, password } = new RegisterUser(payload)

    // Assert
    expect(username).toEqual(payload.username)
    expect(fullname).toEqual(payload.fullname)
    expect(password).toEqual(payload.password)
  })
})
