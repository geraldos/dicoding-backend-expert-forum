const DetailThread = require('../../../Domains/threads/entities/DetailThread')
const DetailComment = require('../../../Domains/comments/entities/DetailComment')
const DetailReply = require('../../../Domains/replies/entities/DetailReply')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_DATE_THREAD,
  FAKE_USERNAME,
  FAKE_COMMENT_ID,
  FAKE_COMMENT_CONTENT,
  FAKE_REPLY_ID,
  FAKE_REPLY_CONTENT
} = require('../../../Commons/utils/CommonConstanta')

describe('GetDetailThreadUseCase', () => {
  it('should orchestrate the get detail thread action correctly', async () => {
    // Arrange
    const useCaseParams = {
      threadId: FAKE_ID_THREAD
    }

    const expectedComment = [
      new DetailComment({
        id: FAKE_COMMENT_ID,
        username: `${FAKE_USERNAME} geraldo`,
        date: FAKE_DATE_THREAD,
        content: FAKE_COMMENT_CONTENT,
        deleted: false,
        replies: []
      })
    ]

    const expectedDetailReply = [
      new DetailReply({
        id: FAKE_REPLY_ID,
        commentId: FAKE_COMMENT_ID,
        content: FAKE_REPLY_CONTENT,
        date: FAKE_DATE_THREAD,
        username: `${FAKE_USERNAME} geraldo`
      })
    ]

    const expectedDetailThread = new DetailThread({
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      date: FAKE_DATE_THREAD,
      username: FAKE_USERNAME,
      comments: []
    })

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDetailThread))
    mockThreadRepository.getRepliesByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDetailReply))

    mockCommentRepository.getCommentByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComment))

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    // Action
    const detailThread = await getDetailThreadUseCase.execute(useCaseParams)

    // Assert
    expect(detailThread).toEqual(expectedDetailThread)
  })
})
