const {
  verifyDataTypeString,
  verifyLengthCharacter,
  verifyContainWhiteSpace
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_ADD_REPLY_NEED_PROPERTY,
  ERR_ADD_REPLY_DATA_TYPE_SPECIFICATION,
  ERR_ADD_REPLY_OWNER_LIMIT_CHARACTER,
  ERR_ADD_REPLY_COMMENT_ID_LIMIT_CHARACTER,
  ERR_ADD_REPLY_COMMENT_ID_WITH_WHITE_SPACE,
  ERR_ADD_REPLY_OWNER_WITH_WHITE_SPACE
} = require('../../../Commons/utils/CommonConstanta')

class AddReply {
  constructor (payload) {
    this._verifyPayload(payload)

    const { commentId, owner, content, date } = payload
    this.commentId = commentId
    this.owner = owner
    this.content = content
    this.date = date
  }

  _verifyPayload (payload) {
    const { commentId, owner, content, date } = payload

    if (!commentId || !owner || !content || !date) throw new Error(ERR_ADD_REPLY_NEED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADD_REPLY_DATA_TYPE_SPECIFICATION)

    if (verifyLengthCharacter(commentId, 50)) throw new Error(ERR_ADD_REPLY_COMMENT_ID_LIMIT_CHARACTER)
    if (verifyLengthCharacter(owner, 30)) throw new Error(ERR_ADD_REPLY_OWNER_LIMIT_CHARACTER)

    if (verifyContainWhiteSpace(commentId)) throw new Error(ERR_ADD_REPLY_COMMENT_ID_WITH_WHITE_SPACE)
    if (verifyContainWhiteSpace(owner)) throw new Error(ERR_ADD_REPLY_OWNER_WITH_WHITE_SPACE)
  }
}

module.exports = AddReply
