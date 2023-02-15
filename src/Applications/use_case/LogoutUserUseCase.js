const {
  ERR_DELETE_AUTHENTICATION_USE_CASE_NOT_CONTAIN_REFRESH_TOKEN,
  ERR_DELETE_AUTHENTICATION_USE_CASE_NOT_MEET_DATA_TYPE_SPECIFICATION
} = require('../../Commons/utils/CommonConstanta')
const { verifyDataTypeString } = require('../../Commons/utils/CommonFunction')

class LogoutUserUseCase {
  constructor ({
    authenticationRepository
  }) {
    this._authenticationRepository = authenticationRepository
  }

  async execute (useCasePayload) {
    this._validatePayload(useCasePayload)
    const { refreshToken } = useCasePayload
    await this._authenticationRepository.checkAvailabilityToken(refreshToken)
    await this._authenticationRepository.deleteToken(refreshToken)
  }

  _validatePayload (payload) {
    const { refreshToken } = payload
    if (!refreshToken) throw new Error(ERR_DELETE_AUTHENTICATION_USE_CASE_NOT_CONTAIN_REFRESH_TOKEN)
    if (verifyDataTypeString(payload)) throw new Error(ERR_DELETE_AUTHENTICATION_USE_CASE_NOT_MEET_DATA_TYPE_SPECIFICATION)
  }
}

module.exports = LogoutUserUseCase
