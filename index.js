var jpegSize = require('jpeg-size')
var pngSize = require('png-size')

var supported =
getSize.supported = window.FileReader
  && window.Uint8Array
  && FileReader.prototype.readAsArrayBuffer

module.exports = getSize

function getSize(file, callback) {
  var type = file.type

  if (!supported
    || !(type === 'image/jpeg' || type === 'image/png')
  ) return callback()

  var reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onerror = callback.bind(null, new Error())
  reader.onload = function () {
    var view = new Uint8Array(reader.result)
    var size = (type === 'image/jpeg' ? jpegSize : pngSize)(view)
    callback(null, size)
    reader = view = null
  }
}