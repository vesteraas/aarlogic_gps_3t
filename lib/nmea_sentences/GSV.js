var tools = require('../tools.js');

// GPGSV

exports.decode = function (sentence) {
  var code = 'GSV';

  if ((typeof sentence) != 'string') {
    throw 'sentence must be a string';
  }

  if (sentence.indexOf('$GP' + code) != 0) {
    throw 'wrong NMEA code';
  }

    var parts = tools.nmea_trim(sentence).split(',');

  if (parts.length != 20) {
    throw 'expected 20 parts, but found ' + parts.length;
  }

  var pc = 1;

  return {
    code:        code,
    totalMessages: parseInt(parts[pc++]),
    messageNumber: parseInt(parts[pc++]),
    totalNumberOfSatellitesInView: parseInt(parts[pc++]),
    satellites: [tools.satellite(parts[pc++], parts[pc++], parts[pc++], parts[pc++]), tools.satellite(parts[pc++], parts[pc++], parts[pc++], parts[pc++]), tools.satellite(parts[pc++], parts[pc++], parts[pc++], parts[pc++]), tools.satellite(parts[pc++], parts[pc++], parts[pc++], parts[pc++])]
  }
}