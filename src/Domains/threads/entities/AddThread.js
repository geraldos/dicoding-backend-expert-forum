const {
  verifyDataTypeString,
  verifyProperty,
  verifyLengthCharacter,
  verifyContainWhiteSpace
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_ADD_THREAD_NEED_PROPERTY,
  ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION,
  ERR_ADD_THREAD_ID_LIMIT_CHARACTER,
  ERR_ADD_THREAD_OWNER_LIMIT_CHARACTER,
  ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER,
  ERR_ADD_THREAD_ID_WITH_WHITE_SPACE,
  ERR_ADD_THREAD_OWNER_WITH_WHITE_SPACE,
  PROPERTY_ADD_THREAD
} = require('../../../Commons/utils/CommonConstanta')

class AddThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, title, body, owner, date } = payload
    this.id = id
    this.title = title
    this.body = body
    this.owner = owner
    this.date = date
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_ADD_THREAD)) throw new Error(ERR_ADD_THREAD_NEED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION)

    if (verifyLengthCharacter(payload.id, 50)) throw new Error(ERR_ADD_THREAD_ID_LIMIT_CHARACTER)
    if (verifyLengthCharacter(payload.title, 50)) throw new Error(ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER)
    if (verifyLengthCharacter(payload.owner, 30)) throw new Error(ERR_ADD_THREAD_OWNER_LIMIT_CHARACTER)

    if (verifyContainWhiteSpace(payload.id)) throw new Error(ERR_ADD_THREAD_ID_WITH_WHITE_SPACE)
    if (verifyContainWhiteSpace(payload.owner)) throw new Error(ERR_ADD_THREAD_OWNER_WITH_WHITE_SPACE)
  }
}

module.exports = AddThread
