const AddedComment = require('../../Domains/comments/entities/AddedComment')
const CommentRepository = require('../../Domains/comments/CommentRepository')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')

const {
  ERR_MSG_CANNOT_DELETE_COMMENT,
  ERR_MSG_CANNOT_ACCESS_COMMENT,
  ERR_MSG_COMMENT_NOT_FOUND,
  ERR_MSG_COMMENT_NOT_FOUND_BELONG_THREAD
} = require('../../Commons/utils/CommonConstanta')

class CommentRepositoryPostgres extends CommentRepository {
  constructor (pool, idGenerator) {
    super()

    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addComment (addComment) {
    const { threadId, owner, content, date } = addComment
    const id = `comment-${this._idGenerator()}`

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, threadId, owner, content, date]
    }

    const { rows } = await this._pool.query(query)
    return new AddedComment({ ...rows[0] })
  }

  async verifyCommentAccess ({ commentId, owner }) {
    const query = {
      text: 'SELECT 1 FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, owner]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new AuthorizationError(ERR_MSG_CANNOT_ACCESS_COMMENT)
  }

  async checkCommentExist ({ commentId, threadId }) {
    const query = {
      text: `SELECT 1 FROM comments
      INNER JOIN threads ON comments.thread_id = threads.id
      WHERE threads.id = $1
      AND comments.id = $2`,
      values: [threadId, commentId]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new NotFoundError(ERR_MSG_COMMENT_NOT_FOUND)
  }

  async checkCommentBelongsToThread ({ commentId, threadId }) {
    const query = {
      text: 'SELECT 1 FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId]
    }

    const { rows } = await this._pool.query(query)
    if (!rows[0]) throw new NotFoundError(ERR_MSG_COMMENT_NOT_FOUND_BELONG_THREAD)
  }

  async getCommentByThreadId (threadId) {
    const query = {
      text: `SELECT comments.id, comments.content, comments.date, users.username, comments.deleted
      FROM comments
      INNER JOIN users
      ON comments.owner = users.id
      WHERE comments.thread_id = $1
      ORDER BY comments.date ASC`,
      values: [threadId]
    }

    const { rows } = await this._pool.query(query)
    return rows
  }

  async deleteCommentById (commentId) {
    const query = {
      text: 'UPDATE comments SET deleted=TRUE WHERE id=$1 RETURNING id',
      values: [commentId]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new NotFoundError(ERR_MSG_CANNOT_DELETE_COMMENT)
  }
}

module.exports = CommentRepositoryPostgres
