const {
  verifyDataTypeString,
  verifyProperty
} = require('../../../Commons/utils/CommonFunction')
const {
  PROPERTY_USER_LOGIN,
  ERR_LOGIN_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_LOGIN_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../Commons/utils/CommonConstanta')

class UserLogin {
  constructor (payload) {
    this._verifyPayload(payload)

    this.username = payload.username
    this.password = payload.password
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_USER_LOGIN)) throw new Error(ERR_LOGIN_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_LOGIN_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = UserLogin
