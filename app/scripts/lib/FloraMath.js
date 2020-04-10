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
