const DetailThread = require('../../../Domains/threads/entities/DetailThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_DATE_THREAD,
  FAKE_USERNAME,
  FAKE_COMMENT_ID,
  FAKE_COMMENT_CONTENT
} = require('../../../Commons/utils/CommonConstanta')
const DetailComment = require('../../../Domains/comments/entities/DetailComment')
const CommentRepository = require('../../../Domains/comments/CommentRepository')

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
        replies: []
      })
    ]

    const expectedDetailThread = new DetailThread({
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      date: FAKE_DATE_THREAD,
      username: FAKE_USERNAME,
      comments: expectedComment
    })

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDetailThread))
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
