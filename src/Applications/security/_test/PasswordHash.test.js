const EncryptionHelper = require('../PasswordHash')

const {
  ERR_PASSWORD_HASH,
  FAKE_USER_PASSWORD,
  FAKE_PLAIN_PASSWORD,
  FAKE_ENCRYPTED_PASSWORD
} = require('../../../Commons/utils/CommonConstanta')

describe('EncryptionHelper interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const encryptionHelper = new EncryptionHelper()

    // Action & Assert
    await expect(encryptionHelper.hash(FAKE_USER_PASSWORD)).rejects.toThrowError(ERR_PASSWORD_HASH)
    await expect(encryptionHelper.comparePassword(FAKE_PLAIN_PASSWORD, FAKE_ENCRYPTED_PASSWORD)).rejects.toThrowError(ERR_PASSWORD_HASH)
  })
})
