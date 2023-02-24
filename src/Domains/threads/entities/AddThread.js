const {
  verifyDataTypeString,
  verifyLengthCharacter,
  verifyContainWhiteSpace
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_ADD_THREAD_NEED_PROPERTY,
  ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION,
  ERR_ADD_THREAD_OWNER_LIMIT_CHARACTER,
  ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER,
  ERR_ADD_THREAD_OWNER_WITH_WHITE_SPACE
} = require('../../../Commons/utils/CommonConstanta')

class AddThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { title, body, owner, date } = payload
    this.title = title
    this.body = body
    this.owner = owner
    this.date = date
  }

  _verifyPayload (payload) {
    const { title, body, owner, date } = payload

    if (!title || !body || !owner || !date) throw new Error(ERR_ADD_THREAD_NEED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION)

    if (verifyLengthCharacter(title, 50)) throw new Error(ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER)
    if (verifyLengthCharacter(owner, 30)) throw new Error(ERR_ADD_THREAD_OWNER_LIMIT_CHARACTER)

    if (verifyContainWhiteSpace(owner)) throw new Error(ERR_ADD_THREAD_OWNER_WITH_WHITE_SPACE)
  }
}

module.exports = AddThread
