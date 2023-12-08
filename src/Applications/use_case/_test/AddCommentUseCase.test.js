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
const CommentRepository = require('../../../Domains/comments/CommentRepository')

describe('AddCommentUseCase', () => {
  it('should orchestrate the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: FAKE_COMMENT_CONTENT
    }
    const useCaseParams = {
      threadId: FAKE_ID_THREAD
    }
    const expectedAddedComment = {
      id: FAKE_COMMENT_ID,
      content: FAKE_COMMENT_CONTENT,
      owner: FAKE_OWNER_THREAD
    }
    const expectedDetailThread = {
      username: FAKE_USERNAME,
      id: FAKE_ID_THREAD,
      title: FAKE_TITLE_THREAD,
      body: FAKE_BODY_THREAD,
      date: FAKE_DATE_THREAD
    }

    /** arrange creating dependency of use case */
    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    /** arrange mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedDetailThread))
    mockCommentRepository.addComment = jest.fn(() => expectedAddedComment)

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
  })
})
