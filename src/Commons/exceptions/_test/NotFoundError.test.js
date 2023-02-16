const NotFoundError = require('../NotFoundError')
const ClientError = require('../ClientError')

const {
  ERR_NOT_FOUND_SMALL,
  ERR_NOT_FOUND
} = require('../../utils/CommonConstanta')

describe('NotFoundError', () => {
  it('should create error correctly', () => {
    const notFoundError = new NotFoundError(ERR_NOT_FOUND_SMALL)

    expect(notFoundError).toBeInstanceOf(NotFoundError)
    expect(notFoundError).toBeInstanceOf(ClientError)
    expect(notFoundError).toBeInstanceOf(Error)

    expect(notFoundError.message).toEqual(ERR_NOT_FOUND_SMALL)
    expect(notFoundError.statusCode).toEqual(404)
    expect(notFoundError.name).toEqual(ERR_NOT_FOUND)
  })
})
