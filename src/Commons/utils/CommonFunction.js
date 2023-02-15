const verifyProperty = (payload, array) => JSON.stringify(Object.keys(payload)) !== JSON.stringify(array)
const verifyDataTypeString = (payload) => Object.values(payload).some(prop => typeof prop !== 'string')
const verifyLengthCharacter = (string, length) => string.length > length
const verifyContainWhiteSpace = (string) => string.match(/\s/)
const verifyRestrictedCharacter = (string) => !string.match(/^[\w]+$/)

module.exports = {
  verifyProperty,
  verifyDataTypeString,
  verifyLengthCharacter,
  verifyContainWhiteSpace,
  verifyRestrictedCharacter
}
