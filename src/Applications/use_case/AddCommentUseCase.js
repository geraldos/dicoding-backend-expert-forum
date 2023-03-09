const AddComment = require('../../Domains/comments/entities/AddComment')

const { FAKE_DATE_THREAD } = require('../../Commons/utils/CommonConstanta')

class AddCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload, useCaseParams, headerAuthorization) {
    await this._threadRepository.getThreadById(useCaseParams.threadId)

    const addComment = new AddComment({
      threadId: useCaseParams.threadId,
      owner: headerAuthorization,
      ...useCasePayload,
      date: FAKE_DATE_THREAD
    })

    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
