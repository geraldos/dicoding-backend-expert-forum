const InvariantError = require('./InvariantError')

const {
  ERR_MSG_MUST_SEND_USERNAME_AND_PASSWORD,
  ERR_MSG_DATA_TYPE_USERNAME_PASSWORD_MUST_STRING,
  ERR_MSG_MUST_SEND_REFRESH_TOKEN,
  ERR_MSG_REFRESH_TOKEN_MUST_STRING
} = require('../utils/CommonConstanta')

const DomainErrorTranslator = {
  translate (error) {
    return DomainErrorTranslator._directories[error.message] || error
  }
}

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(ERR_MSG_MUST_SEND_USERNAME_AND_PASSWORD),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(ERR_MSG_DATA_TYPE_USERNAME_PASSWORD_MUST_STRING),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError(ERR_MSG_MUST_SEND_REFRESH_TOKEN),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(ERR_MSG_REFRESH_TOKEN_MUST_STRING),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError(ERR_MSG_MUST_SEND_REFRESH_TOKEN),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(ERR_MSG_REFRESH_TOKEN_MUST_STRING)
}

module.exports = DomainErrorTranslator
