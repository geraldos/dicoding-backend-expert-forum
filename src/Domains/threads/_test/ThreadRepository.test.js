const ThreadRepository = require('../ThreadRepository')

const { ERR_THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../../Commons/utils/CommonConstanta')

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const threadRepository = new ThreadRepository()

    // Action and Assert
    await expect(threadRepository.addThread({})).rejects.toThrowError(ERR_THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  })
})
