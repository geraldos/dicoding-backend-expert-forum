const { ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../Commons/utils/CommonConstanta')

class AuthenticationRepository {
  async addToken () {
    throw new Error(ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async checkAvailabilityToken () {
    throw new Error(ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async deleteToken () {
    throw new Error(ERR_AUTHENTICATION_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }
}

module.exports = AuthenticationRepository
