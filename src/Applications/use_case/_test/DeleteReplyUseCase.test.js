const ReplyRepository = require('../../../Domains/replies/ReplyRepository')
const DeleteReplyUseCase = require('../DeleteReplyUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_COMMENT_ID,
  FAKE_OWNER_THREAD,
  FAKE_REPLY_ID
} = require('../../../Commons/utils/CommonConstanta')

describe('DeleteReplyUseCase', () => {
  it('should orchestrate the delete reply action correctly', async () => {
    // Arrange
    const useCaseHeader = FAKE_OWNER_THREAD

    const useCaseParams = {
      threadId: FAKE_ID_THREAD,
      commentid: FAKE_COMMENT_ID,
      replyId: FAKE_REPLY_ID
    }
    const expectedCheckReply = {
      threadId: useCaseParams.threadId,
      commentid: useCaseParams.commentid,
      replyId: useCaseParams.replyId
    }
    const expectedVerifyReplyAccess = {
      owner: FAKE_OWNER_THREAD,
      replyId: useCaseParams.replyId
    }
    const expectedDeletedReply = {
      id: FAKE_REPLY_ID
    }

    const mockReplyRepository = new ReplyRepository()

    mockReplyRepository.checkReplyExist = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockReplyRepository.verifyReplyAccess = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockReplyRepository.deleteReplyById = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository
    })

    // Action
    await deleteCommentUseCase.execute(useCaseParams, useCaseHeader)

    // Assert
    expect(mockReplyRepository.checkReplyExist).toBeCalledWith(expectedCheckReply)
    expect(mockReplyRepository.verifyReplyAccess).toBeCalledWith(expectedVerifyReplyAccess)

    expect(mockReplyRepository.deleteReplyById).toBeCalledWith(expectedDeletedReply.id)
  })
})
