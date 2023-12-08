const AddReply = require('../AddReply')

const {
  FAKE_COMMENT_ID,
  FAKE_OWNER_THREAD,
  FAKE_REPLY_CONTENT,
  ERR_ADD_REPLY_NEED_PROPERTY,
  ERR_ADD_REPLY_DATA_TYPE_SPECIFICATION,
  FAKE_DATE_THREAD,
  FAKE_VALUE_GREATER_THAN_LIMIT,
  ERR_ADD_REPLY_COMMENT_ID_LIMIT_CHARACTER,
  ERR_ADD_REPLY_OWNER_LIMIT_CHARACTER,
  FAKE_ID_WITH_WHITE_SPACE,
  ERR_ADD_REPLY_COMMENT_ID_WITH_WHITE_SPACE,
  FAKE_OWNER_WITH_WHITE_SPACE,
  ERR_ADD_REPLY_OWNER_WITH_WHITE_SPACE
} = require('../../../../Commons/utils/CommonConstanta')

describe('a AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      commentid: FAKE_COMMENT_ID,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_REPLY_CONTENT
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError(ERR_ADD_REPLY_NEED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      commentid: FAKE_COMMENT_ID,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_REPLY_CONTENT,
      date: true
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError(ERR_ADD_REPLY_DATA_TYPE_SPECIFICATION)
  })

  it('should throw error when threadId contains more than 50 character', () => {
    // Arrange
    const payload = {
      commentid: FAKE_VALUE_GREATER_THAN_LIMIT,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_REPLY_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError(ERR_ADD_REPLY_COMMENT_ID_LIMIT_CHARACTER)
  })

  it('should throw error when owner contains more than 30 character', () => {
    // Arrange
    const payload = {
      commentid: FAKE_COMMENT_ID,
      owner: FAKE_VALUE_GREATER_THAN_LIMIT,
      content: FAKE_REPLY_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError(ERR_ADD_REPLY_OWNER_LIMIT_CHARACTER)
  })

  it('should throw error when commentid contains white space character', () => {
    // Arrange
    const payload = {
      commentid: FAKE_ID_WITH_WHITE_SPACE,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_REPLY_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError(ERR_ADD_REPLY_COMMENT_ID_WITH_WHITE_SPACE)
  })

  it('should throw error when owner contains white space character', () => {
    // Arrange
    const payload = {
      commentid: FAKE_COMMENT_ID,
      owner: FAKE_OWNER_WITH_WHITE_SPACE,
      content: FAKE_REPLY_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new AddReply(payload)).toThrowError(ERR_ADD_REPLY_OWNER_WITH_WHITE_SPACE)
  })

  it('should create AddReply object correctly', () => {
    // Arrange
    const payload = {
      commentid: FAKE_COMMENT_ID,
      owner: FAKE_OWNER_THREAD,
      content: FAKE_REPLY_CONTENT,
      date: FAKE_DATE_THREAD
    }

    // Action
    const { commentid, owner, content, date } = new AddReply(payload)

    // Assert
    expect(commentid).toEqual(payload.commentid)
    expect(owner).toEqual(payload.owner)
    expect(content).toEqual(payload.content)
    expect(date).toEqual(payload.date)
  })
})
