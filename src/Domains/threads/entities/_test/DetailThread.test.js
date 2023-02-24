const DetailThread = require('../DetailThread')

const {
  FAKE_ID_THREAD,
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_DATE_THREAD,
  FAKE_USERNAME,
  ERR_DETAIL_THREAD_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_DETAIL_THREAD_NOT_MEET_DATA_SPECIFICATION,
  FAKE_ARRAY_COMMENT
} = require('../../../../Commons/utils/CommonConstanta')

describe('a DetailThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      date: FAKE_DATE_THREAD,
      username: FAKE_USERNAME
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError(ERR_DETAIL_THREAD_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 22222,
      title: true,
      body: [FAKE_BODY_THREAD],
      owner: [],
      date: {},
      username: FAKE_USERNAME,
      comments: {}
    }

    // Action and Assert
    expect(() => new DetailThread(payload)).toThrowError(ERR_DETAIL_THREAD_NOT_MEET_DATA_SPECIFICATION)
  })

  it('should create DetailThread object correctly', () => {
    // Arrange
    const payload = {
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      date: FAKE_DATE_THREAD,
      username: FAKE_USERNAME,
      comments: FAKE_ARRAY_COMMENT
    }

    // Action
    const {
      id,
      title,
      body,
      date,
      username,
      comments
    } = new DetailThread(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(title).toEqual(payload.title)
    expect(body).toEqual(payload.body)
    expect(date).toEqual(payload.date)
    expect(username).toEqual(payload.username)
    expect(comments).toEqual(payload.comments)
  })
})
