const ReplyRepository = require('../../../Domains/replies/ReplyRepository')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager')
const DeleteReplyUseCase = require('../DeleteReplyUseCase')

const {
  ACCESS_TOKEN_WITHOUT_UNDERSCORE,
  FAKE_ID_THREAD,
  FAKE_COMMENT_ID,
  FAKE_OWNER_THREAD,
  FAKE_REPLY_ID
} = require('../../../Commons/utils/CommonConstanta')

describe('DeleteReplyUseCase', () => {
  it('should orchestrate the delete reply action correctly', async () => {
    // Arrange
    const useCaseHeader = `Bearer ${ACCESS_TOKEN_WITHOUT_UNDERSCORE}`

    const useCaseParams = {
      threadId: FAKE_ID_THREAD,
      commentId: FAKE_COMMENT_ID,
      replyId: FAKE_REPLY_ID
    }
    const expectedCheckReply = {
      threadId: useCaseParams.threadId,
      commentId: useCaseParams.commentId,
      replyId: useCaseParams.replyId
    }
    const expectedVerifyReplyAccess = {
      owner: FAKE_OWNER_THREAD,
      replyId: useCaseParams.replyId
    }
    const expectedDeletedReply = {
      id: FAKE_REPLY_ID
    }

    const mockAuthenticationTokenManager = new AuthenticationTokenManager()
    const mockReplyRepository = new ReplyRepository()

    mockAuthenticationTokenManager.getTokenHeader = jest.fn()
      .mockImplementation(() => Promise.resolve(ACCESS_TOKEN_WITHOUT_UNDERSCORE))
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ id: FAKE_OWNER_THREAD }))

    mockReplyRepository.checkReplyExist = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockReplyRepository.verifyReplyAccess = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockReplyRepository.deleteReplyById = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
      authenticationTokenManager: mockAuthenticationTokenManager
    })

    // Action
    await deleteCommentUseCase.execute(useCaseParams, useCaseHeader)

    // Assert
    expect(mockAuthenticationTokenManager.getTokenHeader).toBeCalledWith(useCaseHeader)
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(ACCESS_TOKEN_WITHOUT_UNDERSCORE)

    expect(mockReplyRepository.checkReplyExist).toBeCalledWith(expectedCheckReply)
    expect(mockReplyRepository.verifyReplyAccess).toBeCalledWith(expectedVerifyReplyAccess)

    expect(mockReplyRepository.deleteReplyById).toBeCalledWith(expectedDeletedReply.id)
  })
})
