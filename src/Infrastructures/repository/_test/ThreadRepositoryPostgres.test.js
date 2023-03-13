const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')

const AddThread = require('../../../Domains/threads/entities/AddThread')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')

const pool = require('../../database/postgres/pool')

const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')
const {
  FAKE_USERNAME,
  FAKE_TITLE_THREAD,
  FAKE_BODY_THREAD,
  FAKE_DATE_THREAD,
  FAKE_OWNER_THREAD,
  FAKE_FULLNAME,
  FAKE_PASSWORD,
  FAKE_ID_THREAD
} = require('../../../Commons/utils/CommonConstanta')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addThread function', () => {
    it('should persist thread', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: FAKE_OWNER_THREAD,
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD,
        fullname: FAKE_FULLNAME
      })

      const addThread = new AddThread({
        title: FAKE_TITLE_THREAD,
        body: FAKE_BODY_THREAD,
        owner: FAKE_OWNER_THREAD,
        date: FAKE_DATE_THREAD
      })

      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread)

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById(addedThread.id)

      expect(threads).toHaveLength(1)
    })

    it('should return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: FAKE_OWNER_THREAD,
        username: FAKE_USERNAME,
        password: FAKE_PASSWORD,
        fullname: FAKE_FULLNAME
      })

      const addThread = new AddThread({
        title: FAKE_TITLE_THREAD,
        body: FAKE_BODY_THREAD,
        owner: FAKE_OWNER_THREAD,
        date: FAKE_DATE_THREAD
      })

      const fakeIdGenerator = () => '123'
      const expectedAddedThread = new AddedThread({
        id: `thread-${fakeIdGenerator()}`,
        title: FAKE_TITLE_THREAD,
        owner: FAKE_OWNER_THREAD
      })

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(addThread)

      // Assert
      expect(addedThread).toStrictEqual(expectedAddedThread)
    })
  })

  describe('getThreadById function', () => {
    it('should return not found error when thread it does not have', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
      await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool)

      // Action & Assert
      await expect(threadRepositoryPostgres.getThreadById(`${FAKE_ID_THREAD}4`)).rejects.toThrowError(NotFoundError)
    })

    it('should return detail thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
      await ThreadsTableTestHelper.addThread({
        id: FAKE_ID_THREAD,
        title: FAKE_TITLE_THREAD,
        body: FAKE_BODY_THREAD,
        owner: FAKE_OWNER_THREAD,
        date: FAKE_DATE_THREAD
      })

      const expectedDetailThread = {
        id: FAKE_ID_THREAD,
        title: FAKE_TITLE_THREAD,
        body: FAKE_BODY_THREAD,
        date: FAKE_DATE_THREAD,
        username: FAKE_USERNAME
      }
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool)

      // Action
      const detailThread = await threadRepositoryPostgres.getThreadById(FAKE_ID_THREAD)

      // Assert
      expect(detailThread).toEqual(expectedDetailThread)
    })
  })
})
