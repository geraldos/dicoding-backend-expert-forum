const { verifyDataTypeString, verifyDataTypeBoolean } = require('../../../Commons/utils/CommonFunction')

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
      content,
      commentid,
      deleted
    } = payload

    this.id = id
    this.username = username
    this.date = date
    this.content = content
    this.commentid = commentid
    this.deleted = deleted
  }

  _verifyPayload (payload) {
    const { id, username, date, content, commentid, deleted } = payload

    if (!id || !username || !date || !content) throw new Error(ERR_DETAIL_REPLY_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString({ id, username, date, content, commentid }) && verifyDataTypeBoolean({ deleted })) throw new Error(ERR_DETAIL_REPLY_NOT_MEET_DATA_SPECIFICATION)
  }
}

module.exports = DetailReply
