const verifyProperty = (payload, array) => JSON.stringify(Object.keys(payload)) !== JSON.stringify(array)
const verifyDataTypeString = (payload) => Object.values(payload).some(prop => typeof prop !== 'string')
const verifyDataTypeBoolean = (payload) => Object.values(payload).some(prop => typeof prop !== 'boolean')
const verifyLengthCharacter = (string, length) => string.length > length
const verifyContainWhiteSpace = (string) => string.match(/\s/)
const verifyRestrictedCharacter = (string) => !string.match(/^[\w]+$/)

module.exports = {
  verifyProperty,
  verifyDataTypeString,
  verifyDataTypeBoolean,
  verifyLengthCharacter,
  verifyContainWhiteSpace,
  verifyRestrictedCharacter
}
