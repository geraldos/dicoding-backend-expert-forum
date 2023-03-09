const AddReply = require('../../Domains/replies/entities/AddReply')

const { FAKE_DATE_THREAD } = require('../../Commons/utils/CommonConstanta')

class AddReplyUseCase {
  constructor ({ replyRepository, commentRepository }) {
    this._replyRepository = replyRepository
    this._commentRepository = commentRepository
  }

  async execute (useCasePayload, useCaseParams, headerAuthorization) {
    await this._commentRepository.checkCommentBelongsToThread(useCaseParams)

    const addReply = new AddReply({
      ...useCasePayload,
      ...useCaseParams,
      owner: headerAuthorization,
      date: FAKE_DATE_THREAD
    })

    return this._replyRepository.addReply(addReply)
  }
}

module.exports = AddReplyUseCase
