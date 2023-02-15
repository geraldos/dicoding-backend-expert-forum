const RegisteredUser = require('../RegisteredUser')
const {
  FAKE_USERNAME,
  FAKE_FULLNAME,
  FAKE_OWNER_THREAD,
  ERR_REGISTERED_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_REGISTERED_USER_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../../Commons/utils/CommonConstanta')

describe('a RegisteredUser entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      username: FAKE_USERNAME,
      fullname: FAKE_FULLNAME
    }

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(ERR_REGISTERED_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: FAKE_USERNAME,
      fullname: {}
    }

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError(ERR_REGISTERED_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should create registeredUser object correctly', () => {
    // Arrange
    const payload = {
      id: FAKE_OWNER_THREAD,
      username: FAKE_USERNAME,
      fullname: FAKE_FULLNAME
    }

    // Action
    const registeredUser = new RegisteredUser(payload)

    // Assert
    expect(registeredUser.id).toEqual(payload.id)
    expect(registeredUser.username).toEqual(payload.username)
    expect(registeredUser.fullname).toEqual(payload.fullname)
  })
})
