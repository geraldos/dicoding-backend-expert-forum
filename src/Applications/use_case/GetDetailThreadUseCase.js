class GetDetailThreadUseCase {
  constructor ({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository
    this._commentRepository = commentRepository
    this._replyRepository = replyRepository
  }

  async execute (useCaseParams) {
    const { threadId } = useCaseParams

    const detailThread = await this._threadRepository.getThreadById(threadId)
    detailThread.comments = await this._commentRepository.getCommentByThreadId(threadId)

    const threadReplies = await this._replyRepository.getRepliesByThreadId(threadId)

    detailThread.comments.map(comment => {
      comment.replies = threadReplies
        .filter(reply => reply.commentId === comment.id)
        .map(reply => {
          reply.replyDetail.content = reply.replyDetail.deleted ? '**balasan telah dihapus**' : reply.replyDetail.content
          return reply.replyDetail
        })

      comment.content = comment.deleted ? '**komentar telah dihapus**' : comment.content

      return comment
    })

    return detailThread
  }
}

module.exports = GetDetailThreadUseCase
