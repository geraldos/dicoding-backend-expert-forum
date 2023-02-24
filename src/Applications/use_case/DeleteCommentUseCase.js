class DeleteCommentUseCase {
  constructor ({ commentRepository, authenticationTokenManager }) {
    this._commentRepository = commentRepository
    this._authenticationTokenManager = authenticationTokenManager
  }

  async execute (useCaseParams, useCaseHeader) {
    const { commentId, threadId } = useCaseParams

    const accessToken = await this._authenticationTokenManager.getTokenHeader(useCaseHeader)
    await this._authenticationTokenManager.verifyAccessToken(accessToken)
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken)

    await this._commentRepository.checkCommentExist({ threadId, commentId })
    await this._commentRepository.verifyCommentAccess({ commentId, owner })
    await this._commentRepository.deleteCommentById(commentId)
  }
}

module.exports = DeleteCommentUseCase
