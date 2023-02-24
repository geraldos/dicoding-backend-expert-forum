const AddComment = require('../AddComment')

const {
  ERR_ADD_COMMENT_NEED_PROPERTY,
  FAKE_COMMENT_CONTENT,
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_DATE_THREAD,
  ERR_ADD_COMMENT_DATA_TYPE_SPECIFICATION,
  FAKE_VALUE_GREATER_THAN_LIMIT,
  ERR_ADD_COMMENT_THREAD_ID_LIMIT_CHARACTER,
  ERR_ADD_COMMENT_OWNER_LIMIT_CHARACTER,
  ERR_ADD_COMMENT_THREAD_ID_WITH_WHITE_SPACE,
  ERR_ADD_COMMENT_OWNER_WITH_WHITE_SPACE,
  FAKE_ID_WITH_WHITE_SPACE,
  FAKE_OWNER_WITH_WHITE_SPACE
} = require('../../../../Commons/utils/CommonConstanta')

describe('a AddComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      threadId: FAKE_ID_THREAD,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_COMMENT_CONTENT
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(ERR_ADD_COMMENT_NEED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 34123,
      owner: [FAKE_OWNER_THREAD],
      content: {},
      date: true
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(ERR_ADD_COMMENT_DATA_TYPE_SPECIFICATION)
  })

  it('should throw error when threadId contains more than 50 character', () => {
    // Arrange
    const payload = {
      threadId: FAKE_VALUE_GREATER_THAN_LIMIT,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_COMMENT_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(ERR_ADD_COMMENT_THREAD_ID_LIMIT_CHARACTER)
  })

  it('should throw error when owner contains more than 30 character', () => {
    // Arrange
    const payload = {
      threadId: FAKE_ID_THREAD,
      owner: FAKE_VALUE_GREATER_THAN_LIMIT,
      content: FAKE_COMMENT_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(ERR_ADD_COMMENT_OWNER_LIMIT_CHARACTER)
  })

  it('should throw error when threadId contains white space character', () => {
    // Arrange
    const payload = {
      threadId: FAKE_ID_WITH_WHITE_SPACE,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_COMMENT_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(ERR_ADD_COMMENT_THREAD_ID_WITH_WHITE_SPACE)
  })

  it('should throw error when owner contains white space character', () => {
    // Arrange
    const payload = {
      threadId: FAKE_ID_THREAD,
      owner: FAKE_OWNER_WITH_WHITE_SPACE,
      content: FAKE_COMMENT_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError(ERR_ADD_COMMENT_OWNER_WITH_WHITE_SPACE)
  })

  it('should create AddComment object correctly', () => {
    // Arrange
    const payload = {
      threadId: FAKE_ID_THREAD,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_COMMENT_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action
    const { threadId, owner, content, date } = new AddComment(payload)

    // Assert
    expect(threadId).toEqual(payload.threadId)
    expect(owner).toEqual(payload.owner)
    expect(content).toEqual(payload.content)
    expect(date).toEqual(payload.date)
  })
})
