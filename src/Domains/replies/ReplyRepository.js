const { ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../Commons/utils/CommonConstanta')

class ReplyRepository {
  async addReply () {
    throw new Error(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async getReplyByThreadId () {
    throw new Error(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async verifyReplyAccess () {
    throw new Error(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async checkReplyExist () {
    throw new Error(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async deleteReplyById () {
    throw new Error(ERR_REPLY_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }
}

module.exports = ReplyRepository
