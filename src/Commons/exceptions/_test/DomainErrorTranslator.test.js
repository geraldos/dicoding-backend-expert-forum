const DomainErrorTranslator = require('../DomainErrorTranslator')
const InvariantError = require('../InvariantError')

const {
  ERR_REGISTER_USER_NOT_CONTAIN_NEEDED_PROPERTY,
  ERR_REGISTER_USER_NOT_MEET_DATA_TYPE_SPECIFICATION,
  ERR_REGISTER_USER_USERNAME_LIMIT_CHAR,
  ERR_REGISTER_USER_USERNAME_RESTRICTED_CHARACTER,
  ERR_MSG_CANNOT_CREATE_USER,
  ERR_MSG_CANNOT_CREATE_USER_BECAUSE_DATA_TYPE,
  ERR_MSG_CANNOT_CREATE_USER_BECAUSE_USERNAME_LIMIT,
  ERR_MSG_CANNOT_CREATE_USER_BECAUSE_RESTRICTED_CHARACTER,
  SOME_ERROR_MESSAGE,
  ERR_MSG_CANNOT_CREATE_THREAD,
  ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_TITLE_LIMIT,
  ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_DATA_TYPE,
  ERR_ADD_THREAD_NEED_PROPERTY,
  ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION,
  ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER,
  ERR_MSG_CANNOT_CREATE_COMMENT,
  ERR_ADD_COMMENT_NEED_PROPERTY,
  ERR_MSG_CANNOT_CREATE_COMMENT_BECAUSE_DATA_TYPE,
  ERR_ADD_COMMENT_DATA_TYPE_SPECIFICATION
} = require('../../utils/CommonConstanta')

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(DomainErrorTranslator.translate(new Error(ERR_REGISTER_USER_NOT_CONTAIN_NEEDED_PROPERTY)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_USER))
    expect(DomainErrorTranslator.translate(new Error(ERR_REGISTER_USER_NOT_MEET_DATA_TYPE_SPECIFICATION)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_USER_BECAUSE_DATA_TYPE))
    expect(DomainErrorTranslator.translate(new Error(ERR_REGISTER_USER_USERNAME_LIMIT_CHAR)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_USER_BECAUSE_USERNAME_LIMIT))
    expect(DomainErrorTranslator.translate(new Error(ERR_REGISTER_USER_USERNAME_RESTRICTED_CHARACTER)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_USER_BECAUSE_RESTRICTED_CHARACTER))
    expect(DomainErrorTranslator.translate(new Error(ERR_ADD_THREAD_NEED_PROPERTY)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_THREAD))
    expect(DomainErrorTranslator.translate(new Error(ERR_ADD_THREAD_DATA_TYPE_SPECIFICATION)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_DATA_TYPE))
    expect(DomainErrorTranslator.translate(new Error(ERR_ADD_THREAD_TITLE_LIMIT_CHARACTER)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_THREAD_BECAUSE_TITLE_LIMIT))
    expect(DomainErrorTranslator.translate(new Error(ERR_ADD_COMMENT_NEED_PROPERTY)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_COMMENT))
    expect(DomainErrorTranslator.translate(new Error(ERR_ADD_COMMENT_DATA_TYPE_SPECIFICATION)))
      .toStrictEqual(new InvariantError(ERR_MSG_CANNOT_CREATE_COMMENT_BECAUSE_DATA_TYPE))
  })

  it('should return original error when error message is not needed to translate', () => {
    // Arrange
    const error = new Error(SOME_ERROR_MESSAGE)

    // Action
    const translatedError = DomainErrorTranslator.translate(error)

    // Assert
    expect(translatedError).toStrictEqual(error)
  })
})
