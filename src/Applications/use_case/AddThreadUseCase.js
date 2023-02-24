const AddThread = require('../../Domains/threads/entities/AddThread')

const { FAKE_DATE_THREAD } = require('../../Commons/utils/CommonConstanta')

class AddThreadUseCase {
  constructor ({ threadRepository, authenticationTokenManager }) {
    this._threadRepository = threadRepository
    this._authenticationTokenManager = authenticationTokenManager
  }

  async execute (useCasePayload, headerAuthorization) {
    const accessToken = await this._authenticationTokenManager.getTokenHeader(headerAuthorization)

    await this._authenticationTokenManager.verifyAccessToken(accessToken)

    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken)

    const addThread = new AddThread({
      ...useCasePayload,
      owner,
      date: FAKE_DATE_THREAD
    })

    return this._threadRepository.addThread(addThread)
  }
}

module.exports = AddThreadUseCase
