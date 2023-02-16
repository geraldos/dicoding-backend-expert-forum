const {
  ERR_CLIENT_ERROR,
  ERR_ABSTRACT_CLASS
} = require('../utils/CommonConstanta')

class ClientError extends Error {
  constructor (message, statusCode = 400) {
    super(message)

    if (this.constructor.name === ERR_CLIENT_ERROR) {
      throw new Error(ERR_ABSTRACT_CLASS)
    }

    this.statusCode = statusCode
    this.name = ERR_CLIENT_ERROR
  }
}

module.exports = ClientError
