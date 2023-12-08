const DetailReply = require('../DetailReply')

const {
  FAKE_REPLY_ID,
  FAKE_USERNAME,
  FAKE_DATE_THREAD,
  ERR_DETAIL_REPLY_NOT_CONTAIN_NEEDED_PROPERTY,
  FAKE_REPLY_CONTENT,
  ERR_DETAIL_REPLY_NOT_MEET_DATA_SPECIFICATION,
  FAKE_COMMENT_ID
} = require('../../../../Commons/utils/CommonConstanta')

describe('a DetailReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: FAKE_REPLY_ID,
      username: FAKE_USERNAME,
      date: FAKE_DATE_THREAD
    }

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError(ERR_DETAIL_REPLY_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: FAKE_REPLY_ID,
      username: FAKE_USERNAME,
      date: FAKE_DATE_THREAD,
      content: [FAKE_REPLY_CONTENT]
    }

    // Action and Assert
    expect(() => new DetailReply(payload)).toThrowError(ERR_DETAIL_REPLY_NOT_MEET_DATA_SPECIFICATION)
  })

  it('should create DetailReply object correctly', () => {
    // Arrange
    const payload = {
      id: FAKE_REPLY_ID,
      username: FAKE_USERNAME,
      date: FAKE_DATE_THREAD,
      content: FAKE_REPLY_CONTENT,
      commentid: FAKE_COMMENT_ID,
      deleted: false
    }

    // Action
    const {
      id,
      username,
      date,
      content,
      commentid,
      deleted
    } = new DetailReply(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(date).toEqual(payload.date)
    expect(content).toEqual(payload.content)
    expect(commentid).toEqual(payload.commentid)
    expect(deleted).toEqual(payload.deleted)
  })
})
