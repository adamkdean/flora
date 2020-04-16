/*
  ______  _       /\  /\
 |  ____|| |     |  \/  |
 | |__   | |  ___ \ / _/  __ _
 |  __|  | | / _ \ | '__|/ _` |
 | |     | || (_) || |  | (_| |
 |_|     |_| \___/ |_|   \__,_|

Digital plant simulation project
*/

function FloraColour() {}

//
// Convert hex string to hsv string, e.g.
// '#ff0000' -> 'hsv(0, 100%, 100%)'
//
FloraColour.hexStringToHsvString = function (hex) {
  return tinycolor(`${hex}`).toHsvString()
}

//
// Convert hsv string to hex string, e.g.
// 'hsv(0, 100%, 100%)' -> '#ff0000'
//
FloraColour.hsvStringToHexString = function (hsv) {
  return tinycolor(`${hsv}`).toHexString()
}

//
// Convert hsv args to hex string, e.g.
// (0, 100, 100) -> '#ff0000'
//
FloraColour.hsvToHexString = function (hue, sat, value) {
  return tinycolor(`hsv(${hue}, ${sat}%, ${value}%)`).toHexString()
}

//
// Convert hsv args to pixi hex string, e.g.
// (0, 100, 100) -> '0xff0000'
//
FloraColour.hsvToPixiString = function (hue, sat, value) {
  return tinycolor(`hsv(${hue}, ${sat}%, ${value}%)`).toHexString().replace('#', '0x')
}
