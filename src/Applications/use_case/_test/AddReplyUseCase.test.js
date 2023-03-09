const AddReply = require('../../../Domains/replies/entities/AddReply')
const AddedReply = require('../../../Domains/replies/entities/AddedReply')
const ReplyRepository = require('../../../Domains/replies/ReplyRepository')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const AddReplyUseCase = require('../AddReplyUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_DATE_THREAD,
  FAKE_COMMENT_ID,
  FAKE_REPLY_CONTENT,
  FAKE_REPLY_ID
} = require('../../../Commons/utils/CommonConstanta')

describe('AddReplyUseCase', () => {
  it('should orchestrate the add reply action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: FAKE_REPLY_CONTENT
    }
    const useCaseParams = {
      threadId: FAKE_ID_THREAD,
      commentId: FAKE_COMMENT_ID
    }
    const expectedAddedReply = new AddedReply({
      id: FAKE_REPLY_ID,
      content: FAKE_REPLY_CONTENT,
      owner: FAKE_OWNER_THREAD
    })
    const expectedAddReply = new AddReply({
      commentId: FAKE_COMMENT_ID,
      owner: FAKE_OWNER_THREAD,
      content: useCasePayload.content,
      date: FAKE_DATE_THREAD
    })

    /** arrange creating dependency of use case */
    const mockReplyRepository = new ReplyRepository()
    const mockCommentRepository = new CommentRepository()

    /** arrange mocking needed function */
    mockCommentRepository.checkCommentBelongsToThread = jest.fn()
      .mockImplementation(() => Promise.resolve())

    mockReplyRepository.addReply = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedReply))

    /* arrange creating use case instance */
    const addReplyUseCase = new AddReplyUseCase({
      replyRepository: mockReplyRepository,
      commentRepository: mockCommentRepository
    })

    // Action
    const addReply = await addReplyUseCase.execute(useCasePayload, useCaseParams, FAKE_OWNER_THREAD)

    // Assert
    expect(addReply).toStrictEqual(expectedAddedReply)
    expect(mockCommentRepository.checkCommentBelongsToThread).toBeCalledWith({
      threadId: useCaseParams.threadId,
      commentId: useCaseParams.commentId
    })
    expect(mockReplyRepository.addReply).toBeCalledWith(expectedAddReply)
  })
})
