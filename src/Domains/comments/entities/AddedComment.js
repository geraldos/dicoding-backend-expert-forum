const {
  verifyProperty,
  verifyDataTypeString
} = require('../../../Commons/utils/CommonFunction')
const {
  PROPERTY_ADDED_COMMENT,
  ERR_ADDED_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_ADDED_COMMENT_USER_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../../Commons/utils/CommonConstanta')

class AddedComment {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, content, owner } = payload

    this.id = id
    this.content = content
    this.owner = owner
  }

  _verifyPayload (payload) {
    if (verifyProperty(payload, PROPERTY_ADDED_COMMENT)) throw new Error(ERR_ADDED_COMMENT_NOT_CONTAIN_NEEDED_PROPERTY)
    if (verifyDataTypeString(payload)) throw new Error(ERR_ADDED_COMMENT_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = AddedComment
