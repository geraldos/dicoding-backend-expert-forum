const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const InvariantError = require('../../../Commons/exceptions/InvariantError')
const RegisterUser = require('../../../Domains/users/entities/RegisterUser')
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser')
const pool = require('../../database/postgres/pool')
const UserRepositoryPostgres = require('../UserRepositoryPostgres')

const {
  FAKE_USERNAME,
  FAKE_PASSWORD_SECRET,
  FAKE_OWNER_THREAD,
  FAKE_FULLNAME
} = require('../../../Commons/utils/CommonConstanta')

describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username not available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: FAKE_USERNAME }) // memasukan user baru dengan username dicoding
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername(FAKE_USERNAME)).rejects.toThrowError(InvariantError)
    })

    it('should not throw InvariantError when username available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername(FAKE_USERNAME)).resolves.not.toThrowError(InvariantError)
    })
  })

  describe('addUser function', () => {
    it('should persist register user and return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD_SECRET,
        fullname: FAKE_FULLNAME
      })
      const fakeIdGenerator = () => '123' // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      await userRepositoryPostgres.addUser(registerUser)

      // Assert
      const users = await UsersTableTestHelper.findUsersById(FAKE_OWNER_THREAD)
      expect(users).toHaveLength(1)
    })

    it('should return registered user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD_SECRET,
        fullname: FAKE_FULLNAME
      })
      const fakeIdGenerator = () => '123' // stub!
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser)

      // Assert
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: FAKE_OWNER_THREAD,
        username: FAKE_USERNAME,
        fullname: FAKE_FULLNAME
      }))
    })
  })

  describe('getPasswordByUsername', () => {
    it('should throw InvariantError when user not found', () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      return expect(userRepositoryPostgres.getPasswordByUsername(FAKE_USERNAME))
        .rejects
        .toThrowError(InvariantError)
    })

    it('should return username password when user is found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD_SECRET
      })

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByUsername(FAKE_USERNAME)
      expect(password).toBe(FAKE_PASSWORD_SECRET)
    })
  })

  describe('getIdByUsername', () => {
    it('should throw InvariantError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action & Assert
      await expect(userRepositoryPostgres.getIdByUsername(FAKE_USERNAME))
        .rejects
        .toThrowError(InvariantError)
    })

    it('should return user id correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {})

      // Action
      const userId = await userRepositoryPostgres.getIdByUsername(FAKE_USERNAME)

      // Assert
      expect(userId).toEqual(FAKE_OWNER_THREAD)
    })
  })
})
