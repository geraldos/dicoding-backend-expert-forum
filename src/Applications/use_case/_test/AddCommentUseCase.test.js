const AddComment = require('../../../Domains/comments/entities/AddComment')
const AddedComment = require('../../../Domains/comments/entities/AddedComment')
const CommentRepository = require('../../../Domains/comments/CommentRepository')
const DetailThread = require('../../../Domains/threads/entities/DetailThread')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const AddCommentUseCase = require('../AddCommentUseCase')

const {
  FAKE_ID_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_DATE_THREAD,
  FAKE_COMMENT_CONTENT,
  FAKE_COMMENT_ID,
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_USERNAME
} = require('../../../Commons/utils/CommonConstanta')

describe('AddCommentUseCase', () => {
  it('should orchestrate the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: FAKE_COMMENT_CONTENT
    }
    const useCaseParams = {
      threadId: FAKE_ID_THREAD
    }
    const expectedAddedComment = new AddedComment({
      id: FAKE_COMMENT_ID,
      content: FAKE_COMMENT_CONTENT,
      owner: FAKE_OWNER_THREAD
    })
    const expectedAddComment = new AddComment({
      threadId: FAKE_ID_THREAD,
      owner: FAKE_OWNER_THREAD,
      content: useCasePayload.content,
      date: FAKE_DATE_THREAD
    })
    const expectedGetThreadById = new DetailThread({
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      date: FAKE_DATE_THREAD,
      username: FAKE_USERNAME,
      comments: []
    })

    /** arrange creating dependency of use case */
    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    /** arrange mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedGetThreadById))

    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedComment))

    /* arrange creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    // Action
    const addComment = await addCommentUseCase.execute(useCasePayload, useCaseParams, FAKE_OWNER_THREAD)

    // Assert
    expect(addComment).toStrictEqual(expectedAddedComment)
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCaseParams.threadId)
    expect(mockCommentRepository.addComment).toBeCalledWith(expectedAddComment)
  })
})
