var tools = require('../tools.js');

// GPGLL

exports.decode = function (sentence) {
  var code = 'GLL';

  if (sentence.indexOf('$GP' + code) != 0) {
    throw 'wrong NMEA code';
  }

  if ((typeof sentence) != 'string') {
    throw 'sentence must be a string';
  }

  var parts = tools.nmea_trim(sentence).split(',');

  if (parts.length != 7) {
    throw 'expected 7 parts, but found ' + parts.length;
  }

  var pc = 1;

  return {
    code:      code,
    latitude:  tools.decimal_degrees(parts[pc++], parts[pc++]),
    longitude: tools.decimal_degrees(parts[pc++], parts[pc++]),
    time:      tools.timestamp_object(parts[pc++]),
    status:    parts[pc++]
  }
}