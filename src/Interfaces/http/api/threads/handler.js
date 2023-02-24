const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase')
const GetDetailThreadUseCase = require('../../../../Applications/use_case/GetDetailThreadUseCase')

const { STATUS_SUCCESS } = require('../../../../Commons/utils/CommonConstanta')

class ThreadsHandler {
  constructor (container) {
    this._container = container

    this.postThreadHandler = this.postThreadHandler.bind(this)
    this.getThreadHandler = this.getThreadHandler.bind(this)
  }

  async postThreadHandler (request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)
    const addedThread = await addThreadUseCase.execute(request.payload, request.headers.authorization)

    const response = h.response({
      status: STATUS_SUCCESS,
      data: {
        addedThread
      }
    })

    response.code(201)
    return response
  }

  async getThreadHandler (request, h) {
    const getDetailThreadUseCase = this._container.getInstance(GetDetailThreadUseCase.name)
    const detailThread = await getDetailThreadUseCase.execute(request.params)

    const response = h.response({
      status: STATUS_SUCCESS,
      data: {
        thread: detailThread
      }
    })

    return response
  }
}

module.exports = ThreadsHandler
