const ClientError = require('./ClientError')

const { ERR_AUTHORIZATION_ERROR } = require('../utils/CommonConstanta')

class AuthorizationError extends ClientError {
  constructor (message) {
    super(message, 403)
    this.name = ERR_AUTHORIZATION_ERROR
  }
}

module.exports = AuthorizationError
