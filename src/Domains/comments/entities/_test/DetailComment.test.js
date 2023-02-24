const DetailComment = require('../DetailComment')

const {
  FAKE_COMMENT_ID, FAKE_USERNAME,
  FAKE_DATE_THREAD,
  ERR_DETAIL_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY,
  FAKE_COMMENT_CONTENT,
  ERR_DETAIL_COMMENT_NOT_MEET_DATA_SPECIFICATION
} = require('../../../../Commons/utils/CommonConstanta')

describe('a DetailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: FAKE_COMMENT_ID,
      username: FAKE_USERNAME,
      date: FAKE_DATE_THREAD,
      content: FAKE_COMMENT_CONTENT
    }

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError(ERR_DETAIL_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: FAKE_COMMENT_ID,
      username: FAKE_USERNAME,
      date: FAKE_DATE_THREAD,
      content: [FAKE_COMMENT_CONTENT],
      replies: []
    }

    // Action and Assert
    expect(() => new DetailComment(payload)).toThrowError(ERR_DETAIL_COMMENT_NOT_MEET_DATA_SPECIFICATION)
  })

  it('should create DetailComment object correctly', () => {
    // Arrange
    const payload = {
      id: FAKE_COMMENT_ID,
      username: FAKE_USERNAME,
      date: FAKE_DATE_THREAD,
      content: FAKE_COMMENT_CONTENT,
      replies: []
    }

    // Action
    const {
      id,
      username,
      date,
      content,
      replies
    } = new DetailComment(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(date).toEqual(payload.date)
    expect(content).toEqual(payload.content)
    expect(replies).toEqual(payload.replies)
  })
})
