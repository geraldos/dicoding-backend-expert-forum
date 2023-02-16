const bcrypt = require('bcryptjs')
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError')
const BcryptEncryptionHelper = require('../BcryptPasswordHash')

const {
  FAKE_PLAIN_PASSWORDS,
  FAKE_ENCRYPTED_PASSWORDS
} = require('../../../Commons/utils/CommonConstanta')

describe('BcryptEncryptionHelper', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash')
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt)

      // Action
      const encryptedPassword = await bcryptEncryptionHelper.hash(FAKE_PLAIN_PASSWORDS)

      // Assert
      expect(typeof encryptedPassword).toEqual('string')
      expect(encryptedPassword).not.toEqual(FAKE_PLAIN_PASSWORDS)
      expect(spyHash).toBeCalledWith(FAKE_PLAIN_PASSWORDS, 10) // 10 adalah nilai saltRound default untuk BcryptEncryptionHelper
    })
  })

  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt)

      // Act & Assert
      await expect(bcryptEncryptionHelper.comparePassword(FAKE_PLAIN_PASSWORDS, FAKE_ENCRYPTED_PASSWORDS))
        .rejects
        .toThrow(AuthenticationError)
    })

    it('should not return AuthenticationError if password match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt)
      const plainPassword = 'secret'
      const encryptedPassword = await bcryptEncryptionHelper.hash(plainPassword)

      // Act & Assert
      await expect(bcryptEncryptionHelper.comparePassword(plainPassword, encryptedPassword))
        .resolves.not.toThrow(AuthenticationError)
    })
  })
})
