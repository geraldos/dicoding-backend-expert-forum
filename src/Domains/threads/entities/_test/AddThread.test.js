const AddThread = require('../AddThread')

const {
  FAKE_BAD_VALUE_THREAD,
  FAKE_BAD_INPUT_VALUE_THREAD,
  FAKE_VALUE_GREATER_THAN_LIMIT,
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_DATE_THREAD,
  FAKE_OWNER_WITH_WHITE_SPACE,
  ERR_ADD_THREAD_NEED_PROPERTY,
  ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION,
  ERR_ADD_THREAD_OWNER_LIMIT_CHARACTER,
  ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER,
  ERR_ADD_THREAD_OWNER_WITH_WHITE_SPACE
} = require('../../../../Commons/utils/CommonConstanta')

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: FAKE_BAD_VALUE_THREAD,
      body: FAKE_BAD_VALUE_THREAD
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(ERR_ADD_THREAD_NEED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: true,
      body: FAKE_BAD_INPUT_VALUE_THREAD,
      owner: [],
      date: {}
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION)
  })

  it('should throw error when title contains more than 50 character', () => {
    // Arrange
    const payload = {
      title: FAKE_VALUE_GREATER_THAN_LIMIT,
      body: FAKE_BODY_THREAD,
      owner: FAKE_OWNER_THREAD,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER)
  })

  it('should throw error when owner contains more than 30 character', () => {
    // Arrange
    const payload = {
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      owner: FAKE_VALUE_GREATER_THAN_LIMIT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(ERR_ADD_THREAD_OWNER_LIMIT_CHARACTER)
  })

  it('should throw error when owner contains white space character', () => {
    // Arrange
    const payload = {
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      owner: FAKE_OWNER_WITH_WHITE_SPACE,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddThread(payload)).toThrowError(ERR_ADD_THREAD_OWNER_WITH_WHITE_SPACE)
  })

  it('should create AddThread object correctly', () => {
    // Arrange
    const payload = {
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      owner: FAKE_OWNER_THREAD,
      date: FAKE_DATE_THREAD
    }

    // Action
    const { title, body, owner, date } = new AddThread(payload)

    // Assert
    expect(title).toEqual(payload.title)
    expect(body).toEqual(payload.body)
    expect(owner).toEqual(payload.owner)
    expect(date).toEqual(payload.date)
  })
})
