const { ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../Commons/utils/CommonConstanta')

class UserRepository {
  async addUser () {
    throw new Error(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async verifyAvailableUsername () {
    throw new Error(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async getPasswordByUsername () {
    throw new Error(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async getIdByUsername () {
    throw new Error(ERR_USER_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }
}

module.exports = UserRepository
