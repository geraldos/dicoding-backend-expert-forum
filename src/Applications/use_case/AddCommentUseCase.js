const AddComment = require('../../Domains/comments/entities/AddComment')

class AddCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload, useCaseParams, userId) {
    await this._threadRepository.getThreadById(useCaseParams.threadId)

    const addComment = new AddComment({
      threadId: useCaseParams.threadId,
      owner: userId,
      ...useCasePayload,
      date: new Date().toISOString()
    })

    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
