const AddThread = require('../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AddThreadUseCase = require('../AddThreadUseCase')

const {
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_DATE_THREAD
} = require('../../../Commons/utils/CommonConstanta')

describe('AddThreadUseCase', () => {
  it('should orchestrate the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD
    }
    const expectedAddedThread = new AddedThread({
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      owner: FAKE_OWNER_THREAD
    })
    const expectedAddThread = new AddThread({
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: FAKE_OWNER_THREAD,
      date: FAKE_DATE_THREAD
    })

    /** arrange creating dependency of use case */
    const mockThreadRepository = new ThreadRepository()

    /** arrange mocking needed function */

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread))

    /* arrange creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    // Action
    const addThread = await addThreadUseCase.execute(useCasePayload, FAKE_OWNER_THREAD)

    // Assert
    expect(addThread).toStrictEqual(expectedAddedThread)
    expect(mockThreadRepository.addThread).toBeCalledWith(expectedAddThread)
  })
})
