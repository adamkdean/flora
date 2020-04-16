/*
  ______  _       /\  /\
 |  ____|| |     |  \/  |
 | |__   | |  ___ \ / _/  __ _
 |  __|  | | / _ \ | '__|/ _` |
 | |     | || (_) || |  | (_| |
 |_|     |_| \___/ |_|   \__,_|

Digital plant simulation project
*/

function FloraTime(state) {
  this.state = state
}

//
// Process the next step in the simulation
// and update the time within the state
//
FloraTime.prototype.update = function () {
  this.incrementTime()
}

//
// Increment time
//
FloraTime.prototype.incrementTime = function () {
  if (this.state.time < this.state.timeInDay) {
    this.state.time++
  } else {
    this.state.time = 0
    this.incrementDay()
  }
}

//
// Increment day
//
FloraTime.prototype.incrementDay = function () {
  this.state.day++

  if (this.state.dayOfSeason < this.state.daysInSeason) {
    this.state.dayOfSeason++
  } else {
    this.state.dayOfSeason = 1
    this.incrementSeason()
  }
}

//
// Increment season
//
FloraTime.prototype.incrementSeason = function () {
  if (this.state.season < 4) {
    this.state.season++
    console.log(`[Flora] It is now ${this.seasonString()}`)
  } else {
    this.state.season = 1
    this.incrementYear()
  }
}

//
// Increment year
//
FloraTime.prototype.incrementYear = function () {
  this.state.year++
}

//
// Get daylight for today in minutes (time)
//
FloraTime.prototype.daylightMinutes = function () {
  if (this.state.season == 1) return 840      // 14 hours
  else if (this.state.season == 2) return 960 // 16 hours
  else if (this.state.season == 3) return 840 // 14 hours
  else if (this.state.season == 4) return 720 // 12 hours
}

//
// Return time as string
//
FloraTime.prototype.timeString = function () {
  const hours = Math.floor(this.state.time / 60)
  const mins = this.state.time % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

//
// Return season as string
//
FloraTime.prototype.seasonString = function (uppercase = false) {
  if (this.state.season == 1) return uppercase ? 'SPRING' : 'Spring'
  else if (this.state.season == 2) return uppercase ? 'SUMMER' : 'Summer'
  else if (this.state.season == 3) return uppercase ? 'AUTUMN' : 'Autumn'
  else if (this.state.season == 4) return uppercase ? 'WINTER' : 'Winter'
}
