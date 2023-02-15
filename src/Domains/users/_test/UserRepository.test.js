const UserRepository = require('../UserRepository')

const { ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../../Commons/utils/CommonConstanta')

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new UserRepository()

    // Action and Assert
    await expect(userRepository.addUser({})).rejects.toThrowError(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(userRepository.verifyAvailableUsername('')).rejects.toThrowError(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(userRepository.getPasswordByUsername('')).rejects.toThrowError(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
    await expect(userRepository.getIdByUsername('')).rejects.toThrowError(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  })
})
