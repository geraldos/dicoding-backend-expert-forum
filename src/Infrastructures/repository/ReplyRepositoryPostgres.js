const AddedReply = require('../../Domains/replies/entities/AddedReply')
const ReplyRepository = require('../../Domains/replies/ReplyRepository')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')

const DetailReply = require('../../Domains/replies/entities/DetailReply')

const {
  ERR_MSG_CANNOT_ACCESS_REPLY,
  ERR_MSG_REPLY_NOT_FOUND,
  ERR_MSG_CANNOT_DELETE_REPLY
} = require('../../Commons/utils/CommonConstanta')

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor (pool, idGenerator) {
    super()

    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addReply (addReply) {
    const { commentId, owner, content, date } = addReply
    const id = `reply-${this._idGenerator()}`

    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, commentId, owner, content, date]
    }

    const { rows } = await this._pool.query(query)
    return new AddedReply({ ...rows[0] })
  }

  async verifyReplyAccess ({ replyId, owner }) {
    const query = {
      text: 'SELECT 1 FROM replies WHERE id = $1 AND owner = $2',
      values: [replyId, owner]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new AuthorizationError(ERR_MSG_CANNOT_ACCESS_REPLY)
  }

  async checkReplyExist ({ replyId, commentId, threadId }) {
    const query = {
      text: `SELECT 1 FROM replies
      INNER JOIN comments ON replies.comment_id = comments.id
      WHERE replies.id = $1
      AND replies.comment_id = $2
      AND comments.thread_id = $3
      AND replies.deleted = false`,
      values: [replyId, commentId, threadId]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new NotFoundError(ERR_MSG_REPLY_NOT_FOUND)
  }

  async getRepliesByThreadId (id) {
    const query = {
      text: `SELECT replies.id, comments.id AS comment_id, replies.content AS content, replies.date, users.username, replies.deleted 
      FROM replies 
      INNER JOIN comments ON replies.comment_id = comments.id 
      INNER JOIN users ON replies.owner = users.id WHERE comments.thread_id = $1 
      ORDER BY comments.date ASC;`,
      values: [id]
    }

    const { rows } = await this._pool.query(query)

    return rows.map((reply) => new DetailReply({ commentId: reply.comment_id, ...reply }))
  }

  async deleteReplyById (replyId) {
    const query = {
      text: 'UPDATE replies SET deleted=TRUE WHERE id=$1 RETURNING id',
      values: [replyId]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new NotFoundError(ERR_MSG_CANNOT_DELETE_REPLY)
  }
}

module.exports = ReplyRepositoryPostgres
