const {
  verifyProperty,
  verifyDataTypeString
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_NEW_AUTH_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_NEW_AUTH_NOT_MEET_DATA_TYPE_SPECIFICATION,
  PROPERTY_NEW_AUTHENTICATION
} = require('../../../Commons/utils/CommonConstanta')

class NewAuth {
  constructor (payload) {
    this._verifyPayload(payload)

    const { accessToken, refreshToken } = payload

    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_NEW_AUTHENTICATION)) throw new Error(ERR_NEW_AUTH_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_NEW_AUTH_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = NewAuth
