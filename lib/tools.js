'use strict';

exports.nmea_trim = function(line) {
  return line.substr(1, line.lastIndexOf('*') - 1);
}

exports.checksum = function(line) {
  var c = 0;

  for (var i=1; i<line.lastIndexOf('*'); i++) {
    c = c ^ line.charCodeAt(i);
  }

  return c.toString(16).toLowerCase();
}

exports.decimal_degrees = function(coordinate, direction) {
  var parts = coordinate.split('.');

  var sign = 1;

  var degrees;
  var minutes;
  var seconds;

  if (parts[0].length === 4) {
    degrees = parseInt(parts[0].substr(0, 2), 10);
    minutes = parseInt(parts[0].substr(2, 2), 10);
    seconds = parseFloat('0.' + parts[1]) * 60.0;

    if (direction.toLowerCase() === 's') {
      sign = -1;
    }
  } else if (parts[0].length === 5) {
    degrees = parseInt(parts[0].substr(0, 3), 10);
    minutes = parseInt(parts[0].substr(3, 2), 10);
    seconds = parseFloat('0.' + parts[1]) * 60.0;

    if (direction.toLowerCase() === 'w') {
      sign = -1;
    }
  }

  return sign * (degrees + minutes / 60.0 + seconds / 3600.0);
}

exports.altitude_in_meters = function(altitude, unit) {
  var altitude = parseFloat(altitude);

  if (unit.toLowerCase() === 'f') {
    return altitude * 0.3048;
  } else {
    return altitude;
  }
}

exports.magnetic_variation = function(degrees, direction) {
  var sign = 1;

  var degrees = parseFloat(degrees);

  if (direction.toLowerCase() === 'w') {
    sign = -1;
  }

  return sign * degrees;
}

exports.timestamp_object = function(timestamp) {
  var parts = timestamp.split('.');

  var _hours = parseInt(parts[0].substr(0, 2), 10);
  var _minutes = parseInt(parts[0].substr(2, 2), 10);
  var _seconds = parseFloat(parts[0].substr(4, 2));

  if (timestamp.indexOf('.') > -1) {
    _seconds += parseFloat('0.' + parts[1], timestamp);
  }

  return {
    hours: _hours,
    minutes: _minutes,
    seconds: _seconds
  };
}

exports.date_object = function(date) {
  var _day = parseInt(date.substr(0, 2), 10);
  var _month = parseInt(date.substr(2, 2), 10);
  var _year = parseInt(date.substr(4, 2));

  return {
    day: _day,
    month: _month,
    year: _year
  };
}

exports.elements = function(data, from, to) {
  var result = [];

  console.log(to + ', ' + from);

  for (var i=from; i<to; i++) {
    if (data[i] === '') {
      result.push(null);
    } else {
      result.push(data[i]);
    }
  }

  return result;
}

exports.satellite = function(prn, elevation, azimuth, signalToNoiseRatio) {
  return {
    prn: parseInt(prn, 10),
    elevation: parseInt(elevation, 10),
    azimuth: parseInt(azimuth, 10),
    signalToNoiseRation: parseInt(signalToNoiseRatio, 10)
  }
}