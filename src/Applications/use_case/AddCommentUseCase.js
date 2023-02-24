const AddComment = require('../../Domains/comments/entities/AddComment')

const { FAKE_DATE_THREAD } = require('../../Commons/utils/CommonConstanta')

class AddCommentUseCase {
  constructor ({ commentRepository, threadRepository, authenticationTokenManager }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
    this._authenticationTokenManager = authenticationTokenManager
  }

  async execute (useCasePayload, useCaseParams, headerAuthorization) {
    const accessToken = await this._authenticationTokenManager.getTokenHeader(headerAuthorization)

    await this._authenticationTokenManager.verifyAccessToken(accessToken)

    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken)

    await this._threadRepository.getThreadById(useCaseParams.threadId)

    const addComment = new AddComment({
      threadId: useCaseParams.threadId,
      owner,
      ...useCasePayload,
      date: FAKE_DATE_THREAD
    })

    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
