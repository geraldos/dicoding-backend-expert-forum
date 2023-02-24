const {
  verifyProperty,
  verifyDataTypeString
} = require('../../../Commons/utils/CommonFunction')
const {
  PROPERTY_ADDED_THREAD,
  ERR_ADDED_THREAD_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_ADDED_THREAD_USER_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../Commons/utils/CommonConstanta')

class AddedThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, title, owner } = payload

    this.id = id
    this.title = title
    this.owner = owner
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_ADDED_THREAD)) throw new Error(ERR_ADDED_THREAD_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADDED_THREAD_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = AddedThread
