const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager')
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError')
const InvariantError = require('../../Commons/exceptions/InvariantError')

const {
  ERR_MSG_REFRESH_TOKEN_NOT_VALID,
  ERR_MSG_MISSING_TOKEN_AUTHENTICATION
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

  async verifyAccessToken (token) {
    const artifacts = this._jwt.decode(token)
    return this._jwt.verify(artifacts, process.env.ACCESS_TOKEN_KEY)
  }

  async verifyRefreshToken (token) {
    try {
      const artifacts = this._jwt.decode(token)
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY)
    } catch (error) {
      throw new InvariantError(ERR_MSG_REFRESH_TOKEN_NOT_VALID)
    }
  }

  async getTokenHeader (header) {
    if (!header) throw new AuthenticationError(ERR_MSG_MISSING_TOKEN_AUTHENTICATION)

    const token = header.replace(/^Bearer\s+/, '')

    return token
  }

  async decodePayload (token) {
    const artifacts = this._jwt.decode(token)
    return artifacts.decoded.payload
  }
}

module.exports = JwtTokenManager
