const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase')
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase')
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase')

const { STATUS_SUCCESS } = require('../../../../Commons/utils/CommonConstanta')

class AuthenticationsHandler {
  constructor (container) {
    this._container = container

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this)
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this)
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this)
  }

  async postAuthenticationHandler (request, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name)
    const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload)
    const response = h.response({
      status: STATUS_SUCCESS,
      data: {
        accessToken,
        refreshToken
      }
    })
    response.code(201)
    return response
  }

  async putAuthenticationHandler (request) {
    const refreshAuthenticationUseCase = this._container
      .getInstance(RefreshAuthenticationUseCase.name)
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload)

    return {
      status: STATUS_SUCCESS,
      data: {
        accessToken
      }
    }
  }

  async deleteAuthenticationHandler (request) {
    const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name)
    await logoutUserUseCase.execute(request.payload)
    return {
      status: STATUS_SUCCESS
    }
  }
}

module.exports = AuthenticationsHandler
