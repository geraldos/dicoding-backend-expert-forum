const { verifyDataTypeString } = require('../../../Commons/utils/CommonFunction')

const {
  ERR_DETAIL_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_DETAIL_COMMENT_NOT_MEET_DATA_SPECIFICATION
} = require('../../../Commons/utils/CommonConstanta')

class DetailComment {
  constructor (payload) {
    this._verifyPayload(payload)

    const {
      id,
      username,
      date,
      content,
      replies
    } = payload

    this.id = id
    this.username = username
    this.date = date
    this.content = content
    this.replies = replies
  }

  _verifyPayload (payload) {
    const { id, username, date, content, replies } = payload

    if (!id || !username || !date || !content || !replies) throw new Error(ERR_DETAIL_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString({ id, username, date, content }) || !Array.isArray(replies)) throw new Error(ERR_DETAIL_COMMENT_NOT_MEET_DATA_SPECIFICATION)
  }
}

module.exports = DetailComment
