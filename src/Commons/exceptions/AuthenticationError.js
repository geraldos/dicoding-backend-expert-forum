const ClientError = require('./ClientError')

const { ERR_AUTHENTICATION_ERROR } = require('../utils/CommonConstanta')

class AuthenticationError extends ClientError {
  constructor (message) {
    super(message, 401)
    this.name = ERR_AUTHENTICATION_ERROR
  }
}

module.exports = AuthenticationError
