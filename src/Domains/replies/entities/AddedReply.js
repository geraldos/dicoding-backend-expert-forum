const {
  verifyProperty,
  verifyDataTypeString
} = require('../../../Commons/utils/CommonFunction')
const {
  ERR_ADDED_REPLY_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_ADDED_REPLY_COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION,
  PROPERTY_ADDED_REPLY
} = require('../../../Commons/utils/CommonConstanta')

class AddedReply {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, content, owner } = payload

    this.id = id
    this.content = content
    this.owner = owner
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_ADDED_REPLY)) throw new Error(ERR_ADDED_REPLY_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADDED_REPLY_COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = AddedReply
