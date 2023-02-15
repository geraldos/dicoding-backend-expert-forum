const { ERR_AUTHENTICATION_TOKEN_MANAGER } = require('../../Commons/utils/CommonConstanta')

class AuthenticationTokenManager {
  async createRefreshToken () {
    throw new Error(ERR_AUTHENTICATION_TOKEN_MANAGER)
  }

  async createAccessToken () {
    throw new Error(ERR_AUTHENTICATION_TOKEN_MANAGER)
  }

  async verifyRefreshToken () {
    throw new Error(ERR_AUTHENTICATION_TOKEN_MANAGER)
  }

  async decodePayload () {
    throw new Error(ERR_AUTHENTICATION_TOKEN_MANAGER)
  }
}

module.exports = AuthenticationTokenManager
