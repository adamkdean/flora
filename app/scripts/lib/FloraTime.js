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
    this.state.dayOfSeason = 0
    this.incrementSeason()
  }
}

//
// Increment season
//
FloraTime.prototype.incrementSeason = function () {
  if (this.state.season < 4) {
    this.state.season++
  } else {
    this.state.season = 0
    this.incrementYear()
  }
}

//
// Increment year
//
FloraTime.prototype.incrementYear = function () {
  this.state.years++
}

//
// Return time as string
//
FloraTime.prototype.timeString = function () {
  const hours = Math.floor(this.state.time / 60)
  const mins = this.state.time % 60
  return `${hours}:${mins}`
}

//
// Return season as string
//
FloraTime.prototype.seasonString = function () {
  if (this.state.season == 0) return 'SPRING'
  else if (this.state.season == 1) return 'SUMMER'
  else if (this.state.season == 2) return 'AUTUMN'
  else if (this.state.season == 3) return 'WINTER'
}
