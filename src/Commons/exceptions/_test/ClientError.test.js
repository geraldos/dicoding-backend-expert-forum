const ClientError = require('../ClientError')

const { ERR_ABSTRACT_CLASS } = require('../../utils/CommonConstanta')

describe('ClientError', () => {
  it('should throw error when directly use it', () => {
    expect(() => new ClientError('')).toThrowError(ERR_ABSTRACT_CLASS)
  })
})
