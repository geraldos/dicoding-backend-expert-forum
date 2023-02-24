const AddReply = require('../../Domains/replies/entities/AddReply')

const { FAKE_DATE_THREAD } = require('../../Commons/utils/CommonConstanta')

class AddReplyUseCase {
  constructor ({ replyRepository, commentRepository, authenticationTokenManager }) {
    this._replyRepository = replyRepository
    this._commentRepository = commentRepository
    this._authenticationTokenManager = authenticationTokenManager
  }

  async execute (useCasePayload, useCaseParams, headerAuthorization) {
    const accessToken = await this._authenticationTokenManager.getTokenHeader(headerAuthorization)

    await this._authenticationTokenManager.verifyAccessToken(accessToken)

    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken)

    await this._commentRepository.checkCommentBelongsToThread(useCaseParams)

    const addReply = new AddReply({
      ...useCasePayload,
      ...useCaseParams,
      owner,
      date: FAKE_DATE_THREAD
    })

    return this._replyRepository.addReply(addReply)
  }
}

module.exports = AddReplyUseCase
