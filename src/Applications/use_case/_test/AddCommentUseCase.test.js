const AddComment = require('../../../Domains/comments/entities/AddComment')
const AddedComment = require('../../../Domains/comments/entities/AddedComment')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager')
const AddCommentUseCase = require('../AddCommentUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  HEADER_AUTHORIZATION,
  ACCESS_TOKEN_WITHOUT_UNDERSCORE,
  FAKE_DATE_THREAD,
  FAKE_COMMENT_CONTENT,
  FAKE_COMMENT_ID
} = require('../../../Commons/utils/CommonConstanta')

describe('AddThreadUseCase', () => {
  it('should orchestrate the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: FAKE_COMMENT_CONTENT
    }
    const useCaseParams = {
      threadId: FAKE_ID_THREAD
    }
    const expectedAddedComment = new AddedComment({
      id: FAKE_COMMENT_ID,
      content: FAKE_COMMENT_CONTENT,
      owner: FAKE_OWNER_THREAD
    })
    const expectedAddComment = new AddComment({
      threadId: FAKE_ID_THREAD,
      owner: FAKE_OWNER_THREAD,
      content: useCasePayload.content,
      date: FAKE_DATE_THREAD
    })

    /** arrange creating dependency of use case */
    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()
    const mockAuthenticationTokenManager = new AuthenticationTokenManager()

    /** arrange mocking needed function */
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.getTokenHeader = jest.fn()
      .mockImplementation(() => Promise.resolve(ACCESS_TOKEN_WITHOUT_UNDERSCORE))

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve())

    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedComment))

    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: FAKE_OWNER_THREAD }))

    /* arrange creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    // Action
    const addComment = await addCommentUseCase.execute(useCasePayload, useCaseParams, HEADER_AUTHORIZATION)

    // Assert
    expect(addComment).toStrictEqual(expectedAddedComment)

    expect(mockAuthenticationTokenManager.getTokenHeader).toBeCalledWith(HEADER_AUTHORIZATION)
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(ACCESS_TOKEN_WITHOUT_UNDERSCORE)
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(ACCESS_TOKEN_WITHOUT_UNDERSCORE)

    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCaseParams.threadId)

    expect(mockCommentRepository.addComment).toBeCalledWith(expectedAddComment)
  })
})
