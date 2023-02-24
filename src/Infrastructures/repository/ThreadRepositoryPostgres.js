const AddedThread = require('../../Domains/threads/entities/AddedThread')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')

const {
  ERR_MSG_THREAD_NOT_FOUND
} = require('../../Commons/utils/CommonConstanta')
const DetailReply = require('../../Domains/replies/entities/DetailReply')

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor (pool, idGenerator) {
    super()

    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addThread (addThread) {
    const { title, body, owner, date } = addThread
    const id = `thread-${this._idGenerator()}`

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date]
    }

    const { rows } = await this._pool.query(query)
    return new AddedThread({ ...rows[0] })
  }

  async getThreadById (id) {
    const query = {
      text: `SELECT users.username, threads.id, threads.body, threads.title, threads.date FROM threads
      INNER JOIN users ON threads.owner = users.id
      WHERE threads.id = $1`,
      values: [id]
    }

    const { rows } = await this._pool.query(query)
    if (!rows.length) throw new NotFoundError(ERR_MSG_THREAD_NOT_FOUND)

    return rows[0]
  }

  async getRepliesByThreadId (id) {
    const query = {
      text: `SELECT replies.id, comments.id AS comment_id, 
      CASE WHEN replies.deleted = TRUE THEN '**balasan telah dihapus **' else replies.content END AS content, replies.date, users.username 
      FROM replies 
      INNER JOIN comments ON replies.comment_id = comments.id 
      INNER JOIN users ON replies.owner = users.id WHERE comments.thread_id = $1 
      ORDER BY comments.date ASC;`,
      values: [id]
    }

    const { rows } = await this._pool.query(query)

    return rows.map((reply) => new DetailReply({ commentId: reply.comment_id, ...reply }))
  }
}

module.exports = ThreadRepositoryPostgres
