/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const RepliesTableTestHelper = {
  async addReplies ({
    id = 'reply-123',
    commentId = 'comment-123',
    owner = 'user-123',
    content = 'this comment',
    date = '2023-02-15',
    deleted = false
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, commentId, owner, content, date, deleted]
    }

    await pool.query(query)
  },

  async findReplyById (id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
  },

  async cleanTable () {
    await pool.query('DELETE FROM replies WHERE 1=1')
  }
}

module.exports = RepliesTableTestHelper
