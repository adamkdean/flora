/*
  ______  _       /\  /\
 |  ____|| |     |  \/  |
 | |__   | |  ___ \ / _/  __ _
 |  __|  | | / _ \ | '__|/ _` |
 | |     | || (_) || |  | (_| |
 |_|     |_| \___/ |_|   \__,_|

Digital plant simulation project
*/

function FloraMath() {}

//
// Calculates percentage of degrees
//
FloraMath.percentToDegrees = function (value) {
  return value * 360
}

//
// Calculates percentage of radians
//
FloraMath.percentToRadians = function (value) {
  return FloraMath.degreesToRadians(FloraMath.percentToDegrees(value))
}

//
// Calculates radians from degrees
//
FloraMath.degreesToRadians = function (value) {
  return value * Math.PI / 180
}

//
// Normalizes a value between 0 and 1
//
FloraMath.normalize = function (value, min, max) {
  if (max - min === 0) return 1
  return (value - min) / (max - min)
}

//
// Clamps a value between two values
//
FloraMath.clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max)
}
