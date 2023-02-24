const { ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED } = require('../../Commons/utils/CommonConstanta')

class CommentRepository {
  async addComment () {
    throw new Error(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async getCommentByThreadId () {
    throw new Error(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async verifyCommentAccess () {
    throw new Error(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async checkCommentExist () {
    throw new Error(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async checkCommentBelongsToThread () {
    throw new Error(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }

  async deleteCommentById () {
    throw new Error(ERR_COMMENT_REPOSITORY_METHOD_NOT_IMPLEMENTED)
  }
}

module.exports = CommentRepository
