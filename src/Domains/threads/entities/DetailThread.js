const { verifyDataTypeString } = require('../../../Commons/utils/CommonFunction')

const {
  ERR_DETAIL_THREAD_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_DETAIL_THREAD_NOT_MEET_DATA_SPECIFICATION
} = require('../../../Commons/utils/CommonConstanta')

class DetailThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const {
      id,
      title,
      body,
      date,
      username,
      comments
    } = payload

    this.id = id
    this.title = title
    this.body = body
    this.date = date
    this.username = username
    this.comments = comments
  }

  _verifyPayload (payload) {
    const { id, title, body, date, username, comments } = payload

    if (!id || !title || !body || !date || !username || !comments) throw new Error(ERR_DETAIL_THREAD_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString({ id, title, body, date, username }) || !Array.isArray(comments)) throw new Error(ERR_DETAIL_THREAD_NOT_MEET_DATA_SPECIFICATION)
  }
}

module.exports = DetailThread
