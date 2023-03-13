const { ERR_THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../Commons/utils/CommonConstanta')

class ThreadRepository {
  async addThread () {
    throw new Error(ERR_THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async getThreadById () {
    throw new Error(ERR_THREAD_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }
}

module.exports = ThreadRepository
