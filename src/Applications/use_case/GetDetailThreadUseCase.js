class GetDetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepository = commentRepository
  }

  async execute (useCaseParams) {
    const { threadId } = useCaseParams

    const detailThread = await this._threadRepository.getThreadById(threadId)
    detailThread.comments = await this._commentRepository.getCommentByThreadId(threadId)

    return detailThread
  }
}

module.exports = GetDetailThreadUseCase
