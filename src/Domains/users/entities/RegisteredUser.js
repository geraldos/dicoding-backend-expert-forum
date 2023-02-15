const {
  verifyProperty,
  verifyDataTypeString
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_REGISTERED_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_REGISTERED_USER_NOT_MEET_DATA_TYPE_SPECIFICATION,
  PROPERTY_REGISTERED_USER
} = require('../../../Commons/utils/CommonConstanta')

class RegisteredUser {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, username, fullname } = payload

    this.id = id
    this.username = username
    this.fullname = fullname
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_REGISTERED_USER)) throw new Error(ERR_REGISTERED_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_REGISTERED_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = RegisteredUser
