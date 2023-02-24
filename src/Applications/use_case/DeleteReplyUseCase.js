class DeleteReplyUseCase {
  constructor ({ replyRepository, authenticationTokenManager }) {
    this._replyRepository = replyRepository
    this._authenticationTokenManager = authenticationTokenManager
  }

  async execute (useCaseParams, useCaseHeader) {
    const { replyId, threadId, commentId } = useCaseParams

    const accessToken = await this._authenticationTokenManager.getTokenHeader(useCaseHeader)
    await this._authenticationTokenManager.verifyAccessToken(accessToken)
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken)

    await this._replyRepository.checkReplyExist({ replyId, threadId, commentId })
    await this._replyRepository.verifyReplyAccess({ owner, replyId })
    await this._replyRepository.deleteReplyById(replyId)
  }
}

module.exports = DeleteReplyUseCase
