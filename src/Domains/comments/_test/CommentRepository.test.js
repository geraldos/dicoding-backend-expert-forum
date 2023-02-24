const CommentRepository = require('../CommentRepository')

const { ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../../Commons/utils/CommonConstanta')

describe('CommentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new CommentRepository()

    // Action and Assert
    await expect(commentRepository.addComment({})).rejects.toThrowError(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(commentRepository.getCommentByThreadId('')).rejects.toThrowError(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(commentRepository.verifyCommentAccess('')).rejects.toThrowError(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(commentRepository.checkCommentExist('')).rejects.toThrowError(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(commentRepository.checkCommentBelongsToThread('')).rejects.toThrowError(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(commentRepository.deleteCommentById('')).rejects.toThrowError(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  })
})
