/* istanbul ignore next */
class GetDetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepository = commentRepository
  }

  async execute (useCaseParams) {
    const { threadId } = useCaseParams

    const detailThread = await this._threadRepository.getThreadById(threadId)
    detailThread.comments = await this._commentRepository.getCommentByThreadId(threadId)

    const threadReplies = await this._threadRepository.getRepliesByThreadId(threadId)

    detailThread.comments.map(comment => {
      comment.replies = threadReplies
        .filter(reply => reply.commentId === comment.id)
        .map(reply => reply.replyDetail)

      return comment
    })

    return detailThread
  }
}

module.exports = GetDetailThreadUseCase
