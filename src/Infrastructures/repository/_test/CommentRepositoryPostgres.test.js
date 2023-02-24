const CommentTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')

const AddComment = require('../../../Domains/comments/entities/AddComment')
const AddedComment = require('../../../Domains/comments/entities/AddedComment')

const pool = require('../../database/postgres/pool')

const CommentRepositoryPostgres = require('../CommentRepositoryPostgres')

const {
  FAKE_OWNER_THREAD,
  FAKE_USERNAME,
  FAKE_ID_THREAD,
  FAKE_DATE_THREAD,
  FAKE_COMMENT_CONTENT,
  FAKE_COMMENT_ID,
  ERR_MSG_CANNOT_ACCESS_COMMENT,
  ERR_MSG_COMMENT_NOT_FOUND_IN_THREAD,
  ERR_MSG_CANNOT_DELETE_COMMENT
} = require('../../../Commons/utils/CommonConstanta')

describe('CommentRepositoryPostgres', () => {
  describe('behavior test', () => {
    afterEach(async () => {
      await CommentTableTestHelper.cleanTable()
      await UsersTableTestHelper.cleanTable()
      await ThreadsTableTestHelper.cleanTable()
    })

    afterAll(async () => {
      await pool.end()
    })

    describe('addComment function', () => {
      it('should return added comment correctly', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })

        const addComment = new AddComment({
          threadId: FAKE_ID_THREAD,
          owner: FAKE_OWNER_THREAD,
          content: FAKE_COMMENT_CONTENT,
          date: FAKE_DATE_THREAD
        })

        const fakeIdGenerator = () => '123'
        const expectedAddedComment = new AddedComment({
          id: `comment-${fakeIdGenerator()}`,
          content: FAKE_COMMENT_CONTENT,
          owner: FAKE_OWNER_THREAD
        })

        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)

        // Action
        const addedComment = await commentRepositoryPostgres.addComment(addComment)

        // Assert
        expect(addedComment).toStrictEqual(expectedAddedComment)
      })
    })

    describe('verifyCommentAccess function', () => {
      it('should throw because user does not have authorization', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD })

        // Action
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool)

        // Assert
        await expect(commentRepositoryPostgres.verifyCommentAccess({
          ownerId: `${FAKE_USERNAME}-2321`,
          threadId: FAKE_ID_THREAD
        })).rejects.toThrowError(ERR_MSG_CANNOT_ACCESS_COMMENT)
      })
    })

    describe('checkCommentExist function', () => {
      it('should throw because does not comment in the thread', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD })

        // Action
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool)

        // Assert
        await expect(commentRepositoryPostgres.checkCommentExist({
          threadId: FAKE_ID_THREAD,
          commentId: `${FAKE_COMMENT_ID}4`
        })).rejects.toThrowError(ERR_MSG_COMMENT_NOT_FOUND_IN_THREAD)
      })
    })

    describe('getCommentByThreadId function', () => {
      it('should return all comments in detail thread', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({
          id: FAKE_COMMENT_ID,
          threadId: FAKE_ID_THREAD,
          date: FAKE_DATE_THREAD,
          content: FAKE_COMMENT_CONTENT
        })

        // Action
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool)

        // Assert
        const detailComment = await commentRepositoryPostgres.getCommentByThreadId(FAKE_ID_THREAD)

        expect(detailComment).toEqual([
          {
            id: FAKE_COMMENT_ID,
            username: FAKE_USERNAME,
            date: FAKE_DATE_THREAD,
            content: FAKE_COMMENT_CONTENT
          }
        ])
      })
    })

    describe('deleteCommentById function', () => {
      it('should throw error when comment does not exist', async () => {
        // Arrange
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool)

        // Action & Assert
        await expect(commentRepositoryPostgres.deleteCommentById(FAKE_COMMENT_ID))
          .rejects.toThrowError(ERR_MSG_CANNOT_DELETE_COMMENT)
      })

      it('should delete comment by id', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD })

        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool)

        // Action
        await commentRepositoryPostgres.deleteCommentById(FAKE_COMMENT_ID)
        const comment = await CommentTableTestHelper.findCommentsById(FAKE_COMMENT_ID)

        // Assert
        expect(comment.deleted).toEqual(true)
      })
    })
  })
})
