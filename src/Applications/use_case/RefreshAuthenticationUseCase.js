const {
  ERR_REFRESH_USE_CASE_NOT_CONTAIN_REFRESH_TOKEN,
  ERR_REFRESH_USE_CASE_PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../Commons/utils/CommonConstanta')
const { verifyDataTypeString } = require('../../Commons/utils/CommonFunction')

class RefreshAuthenticationUseCase {
  constructor ({
    authenticationRepository,
    authenticationTokenManager
  }) {
    this._authenticationRepository = authenticationRepository
    this._authenticationTokenManager = authenticationTokenManager
  }

  async execute (useCasePayload) {
    this._verifyPayload(useCasePayload)
    const { refreshToken } = useCasePayload

    await this._authenticationTokenManager.verifyRefreshToken(refreshToken)
    await this._authenticationRepository.checkAvailabilityToken(refreshToken)

    const { username, id } = await this._authenticationTokenManager.decodePayload(refreshToken)

    return this._authenticationTokenManager.createAccessToken({ username, id })
  }

  _verifyPayload (payload) {
    const { refreshToken } = payload

    if (!refreshToken) throw new Error(ERR_REFRESH_USE_CASE_NOT_CONTAIN_REFRESH_TOKEN)
    if (verifyDataTypeString(payload)) throw new Error(ERR_REFRESH_USE_CASE_PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = RefreshAuthenticationUseCase
