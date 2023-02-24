const ReplyRepository = require('../ReplyRepository')

const { ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../../Commons/utils/CommonConstanta')

describe('ReplyRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const replyRepository = new ReplyRepository()

    // Action and Assert
    await expect(replyRepository.addReply({})).rejects.toThrowError(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(replyRepository.getReplyByThreadId('')).rejects.toThrowError(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(replyRepository.verifyReplyAccess('')).rejects.toThrowError(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(replyRepository.checkReplyExist('')).rejects.toThrowError(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(replyRepository.deleteReplyById('')).rejects.toThrowError(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  })
})
