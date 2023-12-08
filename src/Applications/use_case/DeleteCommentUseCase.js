class DeleteCommentUseCase {
  constructor ({ commentRepository }) {
    this._commentRepository = commentRepository
  }

  async execute (useCaseParams, useCaseHeader) {
    const { commentid, threadId } = useCaseParams
    const owner = useCaseHeader

    await this._commentRepository.checkCommentExist({ threadId, commentid })
    await this._commentRepository.verifyCommentAccess({ commentid, owner })
    await this._commentRepository.deleteCommentById(commentid)
  }
}

module.exports = DeleteCommentUseCase
