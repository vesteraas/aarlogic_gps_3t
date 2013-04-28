var tools = require('../tools.js');

// GPGGA

exports.decode = function (sentence) {
  var code = 'GGA';

  if ((typeof sentence) != 'string') {
    throw 'sentence must be a string';
  }

  if (sentence.indexOf('$GP' + code) != 0) {
    throw 'wrong NMEA code';
  }

    var parts = tools.nmea_trim(sentence).split(',');

  if (parts.length != 15) {
    throw 'expected 15 parts, but found ' + parts.length;
  }

  var pc = 1;

  return {
    code:        code,
    time:        tools.timestamp_object(parts[pc++]),
    latitude:    tools.decimal_degrees(parts[pc++], parts[pc++]),
    longitude:   tools.decimal_degrees(parts[pc++], parts[pc++]),
    fixQuality: parseInt(parts[pc++], 10),
    numberOfSatellites: parseInt(parts[pc++], 10),
    hdop: parseFloat(parts[pc++]),
    altitudeInMeters: tools.altitude_in_meters(parts[pc++], parts[pc++]),
    heightAboveGeoidInMeters: tools.altitude_in_meters(parts[pc++], parts[pc++]),
    DGPSAgeInSeconds: parseInt(parts[pc++]),
    DGPSStationId: parts[pc++]
  }
}