const {
  verifyDataTypeString,
  verifyLengthCharacter,
  verifyContainWhiteSpace
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_ADD_COMMENT_NEED_PROPERTY,
  ERR_ADD_COMMENT_DATA_TYPE_SPECIFICATION,
  ERR_ADD_COMMENT_OWNER_LIMIT_CHARACTER,
  ERR_ADD_COMMENT_THREAD_ID_LIMIT_CHARACTER,
  ERR_ADD_COMMENT_THREAD_ID_WITH_WHITE_SPACE,
  ERR_ADD_COMMENT_OWNER_WITH_WHITE_SPACE
} = require('../../../Commons/utils/CommonConstanta')

class AddComment {
  constructor (payload) {
    this._verifyPayload(payload)

    const { threadId, owner, content, date } = payload
    this.threadId = threadId
    this.owner = owner
    this.content = content
    this.date = date
  }

  _verifyPayload (payload) {
    const { threadId, owner, content, date } = payload

    if (!threadId || !owner || !content || !date) throw new Error(ERR_ADD_COMMENT_NEED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADD_COMMENT_DATA_TYPE_SPECIFICATION)

    if (verifyLengthCharacter(threadId, 50)) throw new Error(ERR_ADD_COMMENT_THREAD_ID_LIMIT_CHARACTER)
    if (verifyLengthCharacter(owner, 30)) throw new Error(ERR_ADD_COMMENT_OWNER_LIMIT_CHARACTER)

    if (verifyContainWhiteSpace(threadId)) throw new Error(ERR_ADD_COMMENT_THREAD_ID_WITH_WHITE_SPACE)
    if (verifyContainWhiteSpace(owner)) throw new Error(ERR_ADD_COMMENT_OWNER_WITH_WHITE_SPACE)
  }
}

module.exports = AddComment
