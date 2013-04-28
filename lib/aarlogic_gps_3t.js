var tools = require('./tools.js');

var GPGLL = require('./nmea_sentences/GLL.js');
var GPGGA = require('./nmea_sentences/GGA.js');
var GPRMC = require('./nmea_sentences/RMC.js');
var GPGSA = require('./nmea_sentences/GSA.js');
var GPGSV = require('./nmea_sentences/GSV.js');
var GPVTG = require('./nmea_sentences/VTG.js');

var AARLOGIC_GPS_3T = (function () {

  var nmea = {

  };

  nmea.parse = function (line) {
    if (!line) {
      throw 'Must have an input';
    }

    if ((typeof line) != 'string') {
      throw 'Input must be a string';
    }

    if (line.indexOf('$GP') != 0) {
      throw 'Input is not an NMEA sentence';
    }

    var line_checksum = line.substring(line.lastIndexOf('*') + 1, line.length);
    var calculated_checksum = tools.checksum(line);

    if (line_checksum.toLowerCase() !== calculated_checksum) {
      throw 'Illegal checksum';
    }

    var parts = line.split(',');
    var code = parts[0].substring(1, parts[0].length);

    if (code === 'GPGGA') {
      return GPGGA.decode(line);
    } else if (code === 'GPGLL') {
      return GPGLL.decode(line);
    } else if (code === 'GPGSA') {
      return GPGSA.decode(line);
    } else if (code === 'GPGSV') {
      return GPGSV.decode(line);
    } else if (code === 'GPRMC') {
      return GPRMC.decode(line);
    } else if (code === 'GPVTG') {
      return GPVTG.decode(line);
    }
  }

  return nmea;
}());

module.exports = AARLOGIC_GPS_3T;