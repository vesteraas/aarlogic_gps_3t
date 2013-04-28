var tools = require('../tools.js');

// GPVTG

exports.decode = function (sentence) {
  var code = 'VTG';

  if ((typeof sentence) != 'string') {
    throw 'sentence must be a string';
  }

  if (sentence.indexOf('$GP' + code) != 0) {
    throw 'wrong NMEA code';
  }

    var parts = tools.nmea_trim(sentence).split(',');

  if (parts.length != 10) {
    throw 'expected 10 parts, but found ' + parts.length;
  }

  var pc = 1;

  return {
    code:        code,
    trackMadeGood: parseFloat(parts[1]),
    speedOverGroundInKnots: parseFloat(parts[5]),
    speedOverGroundInKilometersPerHour: parseFloat(parts[7])
  }
}