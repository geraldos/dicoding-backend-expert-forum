
const {
  verifyDataTypeString,
  verifyLengthCharacter,
  verifyRestrictedCharacter
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_REGISTER_USER_NOT_MEET_DATA_TYPE_SPECIFICATION,
  ERR_REGISTER_USER_USERNAME_LIMIT_CHAR,
  ERR_REGISTER_USER_USERNAME_RESTRICTED_CHARACTER,
  ERR_REGISTER_USER_NOT_CONTAIN_NEEDED_PROPERTY
} = require('../../../Commons/utils/CommonConstanta')

class RegisterUser {
  constructor (payload) {
    this._verifyPayload(payload)

    const { username, password, fullname } = payload

    this.username = username
    this.password = password
    this.fullname = fullname
  }

  _verifyPayload (payload) {
    if (!payload.username || !payload.password || !payload.fullname) throw new Error(ERR_REGISTER_USER_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_REGISTER_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
    if (verifyLengthCharacter(payload.username, 50)) throw new Error(ERR_REGISTER_USER_USERNAME_LIMIT_CHAR)
    if (verifyRestrictedCharacter(payload.username)) throw new Error(ERR_REGISTER_USER_USERNAME_RESTRICTED_CHARACTER)
  }
}

module.exports = RegisterUser
