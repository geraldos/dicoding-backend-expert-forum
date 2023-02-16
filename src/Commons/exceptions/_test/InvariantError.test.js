const ClientError = require('../ClientError')
const InvariantError = require('../InvariantError')

const {
  ERR_OCCRUS,
  ERR_INVARIANT_ERROR
} = require('../../utils/CommonConstanta')

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError(ERR_OCCRUS)

    expect(invariantError).toBeInstanceOf(InvariantError)
    expect(invariantError).toBeInstanceOf(ClientError)
    expect(invariantError).toBeInstanceOf(Error)

    expect(invariantError.statusCode).toEqual(400)
    expect(invariantError.message).toEqual(ERR_OCCRUS)
    expect(invariantError.name).toEqual(ERR_INVARIANT_ERROR)
  })
})
