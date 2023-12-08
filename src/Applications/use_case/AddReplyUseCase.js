const AddReply = require('../../Domains/replies/entities/AddReply')

class AddReplyUseCase {
  constructor ({ replyRepository, commentRepository }) {
    this._replyRepository = replyRepository
    this._commentRepository = commentRepository
  }

  async execute (useCasePayload, useCaseParams, userId) {
    await this._commentRepository.checkCommentBelongsToThread(useCaseParams)

    const addReply = new AddReply({
      ...useCasePayload,
      ...useCaseParams,
      owner: userId,
      date: new Date().toISOString()
    })

    return this._replyRepository.addReply(addReply)
  }
}

module.exports = AddReplyUseCase
