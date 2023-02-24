const AddedComment = require('../AddedComment')

const {
  FAKE_COMMENT_ID,
  FAKE_COMMENT_CONTENT,
  FAKE_OWNER_THREAD,
  ERR_ADDED_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_ADDED_COMMENT_USER_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../../Commons/utils/CommonConstanta')

describe('a AddedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: FAKE_COMMENT_ID,
      content: FAKE_COMMENT_CONTENT
    }

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError(ERR_ADDED_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: FAKE_COMMENT_ID,
      content: true,
      owner: {}
    }

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError(ERR_ADDED_COMMENT_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should should create AddedComment object correctly', () => {
    const payload = {
      id: FAKE_COMMENT_ID,
      content: FAKE_COMMENT_CONTENT,
      owner: FAKE_OWNER_THREAD
    }

    // Action
    const addedComment = new AddedComment(payload)

    // Assert
    expect(addedComment.id).toEqual(payload.id)
    expect(addedComment.content).toEqual(payload.content)
    expect(addedComment.owner).toEqual(payload.owner)
  })
})
