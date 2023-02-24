const AddThread = require('../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager')
const AddThreadUseCase = require('../AddThreadUseCase')

const {
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  HEADER_AUTHORIZATION,
  ACCESS_TOKEN_WITHOUT_UNDERSCORE,
  FAKE_USERNAME,
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
    const mockAuthenticationTokenManager = new AuthenticationTokenManager()

    /** arrange mocking needed function */
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.getTokenHeader = jest.fn()
      .mockImplementation(() => Promise.resolve(ACCESS_TOKEN_WITHOUT_UNDERSCORE))

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread))

    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: expectedAddedThread.owner, username: FAKE_USERNAME }))

    /* arrange creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
      threadRepository: mockThreadRepository
    })

    // Action
    const addThread = await addThreadUseCase.execute(useCasePayload, HEADER_AUTHORIZATION)

    // Assert
    expect(addThread).toStrictEqual(expectedAddedThread)

    expect(mockAuthenticationTokenManager.getTokenHeader).toBeCalledWith(HEADER_AUTHORIZATION)
    expect(mockAuthenticationTokenManager.verifyAccessToken()).resolves.toBeUndefined()
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(ACCESS_TOKEN_WITHOUT_UNDERSCORE)

    expect(mockThreadRepository.addThread).toBeCalledWith(expectedAddThread)
  })
})
