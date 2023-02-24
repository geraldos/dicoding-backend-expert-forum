const AddedReply = require('../AddedReply')

const {
  FAKE_OWNER_THREAD,
  ERR_ADDED_REPLY_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_ADDED_REPLY_COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION,
  FAKE_REPLY_ID,
  FAKE_REPLY_CONTENT
} = require('../../../../Commons/utils/CommonConstanta')

describe('a AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: FAKE_REPLY_ID,
      content: FAKE_REPLY_CONTENT
    }

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError(ERR_ADDED_REPLY_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: FAKE_REPLY_ID,
      content: true,
      owner: {}
    }

    // Action and Assert
    expect(() => new AddedReply(payload)).toThrowError(ERR_ADDED_REPLY_COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should should create AddedReply object correctly', () => {
    const payload = {
      id: FAKE_REPLY_ID,
      content: FAKE_REPLY_CONTENT,
      owner: FAKE_OWNER_THREAD
    }

    // Action
    const addedReply = new AddedReply(payload)

    // Assert
    expect(addedReply.id).toEqual(payload.id)
    expect(addedReply.content).toEqual(payload.content)
    expect(addedReply.owner).toEqual(payload.owner)
  })
})
