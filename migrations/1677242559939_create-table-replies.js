/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    comment_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(30)',
      notNull: true
    },
    content: {
      type: 'TEXT',
      notNull: true
    },
    date: {
      type: 'TEXT',
      notNull: true
    },
    deleted: {
      type: 'BOOLEAN',
      default: false,
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('replies')
}
