/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const ThreadsTableTestHelper = {
  async addThread ({
    id = 'thread-123', title = 'this title thread', body = 'fake body thread', owner = 'user-123', date = '2023-02-15'
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, owner, date]
    }

    await pool.query(query)
  },

  async findThreadsById (id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id]
    }

    const { rows } = await pool.query(query)
    return rows
  },

  async cleanTable () {
    await pool.query('DELETE FROM threads WHERE 1=1')
  }
}

module.exports = ThreadsTableTestHelper
