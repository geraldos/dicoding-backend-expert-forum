const AddThread = require('../../Domains/threads/entities/AddThread')

const { FAKE_DATE_THREAD } = require('../../Commons/utils/CommonConstanta')

class AddThreadUseCase {
  constructor ({ threadRepository }) {
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload, userId) {
    const addThread = new AddThread({
      ...useCasePayload,
      owner: userId,
      date: FAKE_DATE_THREAD
    })

    return this._threadRepository.addThread(addThread)
  }
}

module.exports = AddThreadUseCase
