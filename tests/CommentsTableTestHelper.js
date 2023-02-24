/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const CommentsTableTestHelper = {
  async addComment ({
    id = 'comment-123', threadId = 'thread-123', owner = 'user-123', content = 'this comment', date = '2023-02-15', deleted = false
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, threadId, owner, content, date, deleted]
    }

    await pool.query(query)
  },

  async findCommentsById (id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
  },

  async cleanTable () {
    await pool.query('DELETE FROM comments WHERE 1=1')
  }
}

module.exports = CommentsTableTestHelper
