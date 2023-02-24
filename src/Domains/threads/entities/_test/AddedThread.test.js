const AddedThread = require('../AddedThread')

const {
  FAKE_ID_THREAD,
  FAKE_TITLE_THREAD,
  FAKE_OWNER_THREAD,
  ERR_ADDED_THREAD_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_ADDED_THREAD_USER_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../../Commons/utils/CommonConstanta')

describe('a AddedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD
    }

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError(ERR_ADDED_THREAD_NOT_CONTAIN_NEEDED_PROPERTY)
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: FAKE_ID_THREAD,
      title: true,
      owner: {}
    }

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError(ERR_ADDED_THREAD_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  })

  it('should should create addedThread object correctly', () => {
    const payload = {
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      owner: FAKE_OWNER_THREAD
    }

    // Action
    const addedThread = new AddedThread(payload)

    // Assert
    expect(addedThread.id).toEqual(payload.id)
    expect(addedThread.title).toEqual(payload.title)
    expect(addedThread.owner).toEqual(payload.owner)
  })
})
