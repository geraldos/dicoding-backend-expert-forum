const { verifyDataTypeString } = require('../../../Commons/utils/CommonFunction')

const {
  ERR_DETAIL_REPLY_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_DETAIL_REPLY_NOT_MEET_DATA_SPECIFICATION
} = require('../../../Commons/utils/CommonConstanta')

class DetailReply {
  constructor (payload) {
    this._verifyPayload(payload)

    const {
      id,
      username,
      date,
      content
    } = payload

    this.id = id
    this.username = username
    this.date = date
    this.content = content
  }

  _verifyPayload (payload) {
    const { id, username, date, content } = payload

    if (!id || !username || !date || !content) throw new Error(ERR_DETAIL_REPLY_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString({ id, username, date, content })) throw new Error(ERR_DETAIL_REPLY_NOT_MEET_DATA_SPECIFICATION)
  }
}

module.exports = DetailReply
