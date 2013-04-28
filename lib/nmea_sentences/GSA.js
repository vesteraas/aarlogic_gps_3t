var tools = require('../tools.js');

// GPGSA

exports.decode = function (sentence) {
  var code = 'GSA';

  if ((typeof sentence) != 'string') {
    throw 'sentence must be a string';
  }

  if (sentence.indexOf('$GP' + code) != 0) {
    throw 'wrong NMEA code';
  }

    var parts = tools.nmea_trim(sentence).split(',');

  if (parts.length != 18) {
    throw 'expected 18 parts, but found ' + parts.length;
  }

  return {
    code:        code,
    mode1:        parts[1],
    mode2:        parts[2],
    satellites:          tools.elements(parts, 3, 15),
    pdop: parseFloat(parts[15]),
    hdop: parseFloat(parts[16]),
    vdop: parseFloat(parts[17])
  }
}