const CommentRepository = require('../../../Domains/comments/CommentRepository')
const DeleteCommentUseCase = require('../DeleteCommentUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_COMMENT_ID,
  FAKE_OWNER_THREAD
} = require('../../../Commons/utils/CommonConstanta')

describe('DeleteCommentUseCase', () => {
  it('should orchestrate the delete comment action correctly', async () => {
    // Arrange
    const useCaseHeader = FAKE_OWNER_THREAD

    const useCaseParams = {
      threadId: FAKE_ID_THREAD,
      commentid: FAKE_COMMENT_ID
    }
    const expectedCheckComment = {
      threadId: useCaseParams.threadId,
      commentid: useCaseParams.commentid
    }
    const expectedVerifyCommentAccess = {
      owner: FAKE_OWNER_THREAD,
      commentid: useCaseParams.commentid
    }
    const expectedDeletedComment = {
      id: FAKE_COMMENT_ID
    }

    const mockCommentRepository = new CommentRepository()

    mockCommentRepository.checkCommentExist = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.verifyCommentAccess = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository
    })

    // Action
    await deleteCommentUseCase.execute(useCaseParams, useCaseHeader)

    // Assert
    expect(mockCommentRepository.checkCommentExist).toBeCalledWith(expectedCheckComment)
    expect(mockCommentRepository.verifyCommentAccess).toBeCalledWith(expectedVerifyCommentAccess)
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(expectedDeletedComment.id)
  })
})
