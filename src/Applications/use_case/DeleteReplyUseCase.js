class DeleteReplyUseCase {
  constructor ({ replyRepository }) {
    this._replyRepository = replyRepository
  }

  async execute (useCaseParams, useCaseHeader) {
    const { replyId, threadId, commentid } = useCaseParams
    const owner = useCaseHeader

    await this._replyRepository.checkReplyExist({ replyId, threadId, commentid })
    await this._replyRepository.verifyReplyAccess({ owner, replyId })
    await this._replyRepository.deleteReplyById(replyId)
  }
}

module.exports = DeleteReplyUseCase
