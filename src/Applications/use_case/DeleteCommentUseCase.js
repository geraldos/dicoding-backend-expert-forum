class DeleteCommentUseCase {
  constructor ({ commentRepository }) {
    this._commentRepository = commentRepository
  }

  async execute (useCaseParams, useCaseHeader) {
    const { commentId, threadId } = useCaseParams
    const owner = useCaseHeader

    await this._commentRepository.checkCommentExist({ threadId, commentId })
    await this._commentRepository.verifyCommentAccess({ commentId, owner })
    await this._commentRepository.deleteCommentById(commentId)
  }
}

module.exports = DeleteCommentUseCase
