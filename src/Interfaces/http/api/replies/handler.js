const AddReplyUseCase = require('../../../../Applications/use_case/AddReplyUseCase')
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase')

const { STATUS_SUCCESS } = require('../../../../Commons/utils/CommonConstanta')

class RepliesHandler {
  constructor (container) {
    this._container = container

    this.postReplyHandler = this.postReplyHandler.bind(this)
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this)
  }

  async postReplyHandler (request, h) {
    const headerAuthorization = request.headers.authorization
    const params = request.params

    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name)
    const addedReply = await addReplyUseCase.execute(request.payload, params, headerAuthorization)

    const response = h.response({
      status: STATUS_SUCCESS,
      data: {
        addedReply
      }
    })

    response.code(201)
    return response
  }

  async deleteReplyHandler (request, h) {
    const headerAuthorization = request.headers.authorization
    const params = request.params

    const deleteReplyUseCase = this._container.getInstance(DeleteReplyUseCase.name)
    await deleteReplyUseCase.execute(params, headerAuthorization)

    return h.response({
      status: STATUS_SUCCESS
    })
  }
}

module.exports = RepliesHandler
