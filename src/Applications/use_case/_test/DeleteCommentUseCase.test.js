const CommentRepository = require('../../../Domains/comments/CommentRepository')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager')
const DeleteCommentUseCase = require('../DeleteCommentUseCase')

const {
  ACCESS_TOKEN_WITHOUT_UNDERSCORE,
  FAKE_ID_THREAD,
  FAKE_COMMENT_ID,
  FAKE_OWNER_THREAD
} = require('../../../Commons/utils/CommonConstanta')

describe('DeleteCommentUseCase', () => {
  it('should orchestrate the delete comment action correctly', async () => {
    // Arrange
    const useCaseHeader = `Bearer ${ACCESS_TOKEN_WITHOUT_UNDERSCORE}`

    const useCaseParams = {
      threadId: FAKE_ID_THREAD,
      commentId: FAKE_COMMENT_ID
    }
    const expectedDeletedComment = {
      id: FAKE_COMMENT_ID
    }

    const mockAuthenticationTokenManager = new AuthenticationTokenManager()
    const mockCommentRepository = new CommentRepository()

    mockAuthenticationTokenManager.getTokenHeader = jest.fn()
      .mockImplementation(() => Promise.resolve(ACCESS_TOKEN_WITHOUT_UNDERSCORE))
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: FAKE_OWNER_THREAD }))

    mockCommentRepository.checkCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.verifyCommentAccess = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    })

    // Action
    await deleteCommentUseCase.execute(useCaseParams, useCaseHeader)

    // Assert
    expect(mockAuthenticationTokenManager.getTokenHeader).toBeCalledWith(useCaseHeader)
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(ACCESS_TOKEN_WITHOUT_UNDERSCORE)

    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(expectedDeletedComment.id)
  })
})
