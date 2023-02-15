const { ERR_PASSWORD_HASH } = require('../../Commons/utils/CommonConstanta')

class PasswordHash {
  async hash () {
    throw new Error(ERR_PASSWORD_HASH)
  }

  async comparePassword () {
    throw new Error(ERR_PASSWORD_HASH)
  }
}

module.exports = PasswordHash
