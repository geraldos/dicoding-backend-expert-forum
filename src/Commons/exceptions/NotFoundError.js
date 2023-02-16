const ClientError = require('./ClientError')

const { ERR_NOT_FOUND } = require('../utils/CommonConstanta')

class NotFoundError extends ClientError {
  constructor (message) {
    super(message, 404)
    this.name = ERR_NOT_FOUND
  }
}

module.exports = NotFoundError
