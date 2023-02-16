const ClientError = require('./ClientError')

const { ERR_INVARIANT_ERROR } = require('../utils/CommonConstanta')

class InvariantError extends ClientError {
  constructor (message) {
    super(message)
    this.name = ERR_INVARIANT_ERROR
  }
}

module.exports = InvariantError
