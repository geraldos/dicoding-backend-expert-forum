const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager')
const InvariantError = require('../../Commons/exceptions/InvariantError')

const {
  ERR_MSG_REFRESH_TOKEN_NOT_VALID
} = require('../../Commons/utils/CommonConstanta')

class JwtTokenManager extends AuthenticationTokenManager {
  constructor (jwt) {
    super()
    this._jwt = jwt
  }

  async createAccessToken (payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY)
  }

  async createRefreshToken (payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY)
  }

  async verifyRefreshToken (token) {
    try {
      const artifacts = this._jwt.decode(token)
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY)
    } catch (error) {
      throw new InvariantError(ERR_MSG_REFRESH_TOKEN_NOT_VALID)
    }
  }

  async decodePayload (token) {
    const artifacts = this._jwt.decode(token)
    return artifacts.decoded.payload
  }
}

module.exports = JwtTokenManager
