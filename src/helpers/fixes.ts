/* eslint-disable no-extend-native */
// @ts-expect-error: fix BigInt serialization issue in JSON
BigInt.prototype.toJSON = function () {
  return this.toString()
}
/* eslint-enable no-extend-native */
