var tools = require('../tools.js');

// GPRMC

exports.decode = function (sentence) {
  var code = 'RMC';

  if ((typeof sentence) != 'string') {
    throw 'sentence must be a string';
  }

  if (sentence.indexOf('$GP' + code) != 0) {
    throw 'wrong NMEA code';
  }

  var parts = tools.nmea_trim(sentence).split(',');

  if (parts.length != 13) {
    throw 'expected 13 parts, but found ' + parts.length;
  }

  var pc = 1;

  return {
    code:      code,
    time:      tools.timestamp_object(parts[pc++]),
    status:    parts[pc++],
    latitude:  tools.decimal_degrees(parts[pc++], parts[pc++]),
    longitude: tools.decimal_degrees(parts[pc++], parts[pc++]),
    speedOverGroundInKnots: parseFloat(parts[pc++]),
    courseOverGround: parseFloat(parts[pc++]),
    date:      tools.date_object(parts[pc++]),
    magneticVariation: tools.magnetic_variation(parts[pc++], parts[pc++])
  }
}