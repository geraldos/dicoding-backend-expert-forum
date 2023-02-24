const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper')
const CommentTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')

const AddReply = require('../../../Domains/replies/entities/AddReply')
const AddedReply = require('../../../Domains/replies/entities/AddedReply')

const pool = require('../../database/postgres/pool')

const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres')

const {
  FAKE_OWNER_THREAD,
  FAKE_USERNAME,
  FAKE_ID_THREAD,
  FAKE_DATE_THREAD,
  FAKE_COMMENT_CONTENT,
  FAKE_COMMENT_ID,
  FAKE_REPLY_ID,
  ERR_MSG_CANNOT_ACCESS_REPLY,
  ERR_MSG_REPLY_NOT_FOUND,
  ERR_MSG_REPLY_DOES_NOT_EXIST
} = require('../../../Commons/utils/CommonConstanta')

describe('CommentRepositoryPostgres', () => {
  describe('behavior test', () => {
    afterEach(async () => {
      await CommentTableTestHelper.cleanTable()
      await UsersTableTestHelper.cleanTable()
      await ThreadsTableTestHelper.cleanTable()
      await RepliesTableTestHelper.cleanTable()
    })

    afterAll(async () => {
      await pool.end()
    })

    describe('addReply function', () => {
      it('should return added reply correctly', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, owner: FAKE_OWNER_THREAD })

        const addReply = new AddReply({
          commentId: FAKE_COMMENT_ID,
          owner: FAKE_OWNER_THREAD,
          content: FAKE_COMMENT_CONTENT,
          date: FAKE_DATE_THREAD
        })

        const fakeIdGenerator = () => '123'
        const expectedAddedReply = new AddedReply({
          id: `reply-${fakeIdGenerator()}`,
          content: FAKE_COMMENT_CONTENT,
          owner: FAKE_OWNER_THREAD
        })

        const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool, fakeIdGenerator)

        // Action
        const addedReply = await replyRepositoryPostgres.addReply(addReply)

        // Assert
        expect(addedReply).toStrictEqual(expectedAddedReply)
      })
    })

    describe('verifyReplyAccess function', () => {
      it('should throw because user does not have authorization', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD })

        // Action
        const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool)

        // Assert
        await expect(replyRepositoryPostgres.verifyReplyAccess({
          ownerId: `${FAKE_USERNAME}-2321`,
          replyId: FAKE_REPLY_ID
        })).rejects.toThrowError(ERR_MSG_CANNOT_ACCESS_REPLY)
      })
    })

    describe('checkReplyExist function', () => {
      it('should throw because does not reply in the comment', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD })

        // Action
        const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool)

        // Assert
        await expect(replyRepositoryPostgres.checkReplyExist({
          threadId: FAKE_ID_THREAD,
          commentId: `${FAKE_COMMENT_ID}`,
          replyId: `${FAKE_REPLY_ID}4`
        })).rejects.toThrowError(ERR_MSG_REPLY_NOT_FOUND)
      })
    })

    describe('deleteReplyById function', () => {
      it('should throw error when reply does not exist', async () => {
        // Arrange
        const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool)

        // Action & Assert
        await expect(replyRepositoryPostgres.deleteReplyById(FAKE_REPLY_ID))
          .rejects.toThrowError(ERR_MSG_REPLY_DOES_NOT_EXIST)
      })

      it('should delete reply by id', async () => {
        // Arrange
        await UsersTableTestHelper.addUser({ id: FAKE_OWNER_THREAD, username: FAKE_USERNAME })
        await ThreadsTableTestHelper.addThread({ id: FAKE_ID_THREAD, owner: FAKE_OWNER_THREAD })
        await CommentTableTestHelper.addComment({ id: FAKE_COMMENT_ID, threadId: FAKE_ID_THREAD })
        await RepliesTableTestHelper.addReplies({ id: FAKE_REPLY_ID, commentId: FAKE_COMMENT_ID })

        const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool)

        // Action
        await replyRepositoryPostgres.deleteReplyById(FAKE_REPLY_ID)
        const reply = await RepliesTableTestHelper.findReplyById(FAKE_REPLY_ID)

        // Assert
        expect(reply.deleted).toEqual(true)
      })
    })
  })
})
