/*
  ______  _       /\  /\
 |  ____|| |     |  \/  |
 | |__   | |  ___ \ / _/  __ _
 |  __|  | | / _ \ | '__|/ _` |
 | |     | || (_) || |  | (_| |
 |_|     |_| \___/ |_|   \__,_|

Digital plant simulation project
*/

function Flora() {}

//
// Initialize everything
//
Flora.prototype.initialize = function (done) {
  this.initializeResources(() => {
    this.initializeApp()
    this.initializeEnvironment()
    this.initializeInterface()
    this.start()
    done()
  })
}

//
// Initialize the app
//
Flora.prototype.initializeApp = function () {
  this.app = new PIXI.Application({
    antialias: true,
    autoResize: true,
    resolution: devicePixelRatio
  })
  this.app.renderer.view.style.position = 'absolute'
  this.app.renderer.view.style.display = 'block'
  this.screenSizeChanged = true
  window.onresize = () => this.screenSizeChanged = true
}

//
// Load all required images and initialize as sprites
//
Flora.prototype.initializeResources = function (done) {
  this.sprites = {}
  this.loader = new PIXI.Loader()
  this.loader.add('sun', 'images/sun.png')
             .add('moon', 'images/moon.png')
             .add('soil', 'images/soil.png')
             .add('test', 'images/test.png')
  this.loader.load((loader, resources) => {
    this.sprites.sun = new PIXI.Sprite(resources.sun.texture)
    this.sprites.moon = new PIXI.Sprite(resources.moon.texture)
    this.sprites.soil = new PIXI.TilingSprite(resources.soil.texture)
    this.sprites.test = new PIXI.Sprite(resources.test.texture)
    done()
  })
}

//
// Adds all objects to the stage etc
//
Flora.prototype.initializeInterface = function (done) {
  const defaultFontStyle = { fontFamily: 'monospace', fontSize: 14, fill: '#aaaaaa' }
  const titleFontStyle = { fontFamily: 'monospace', fontSize: 14, fill: '#49973e' }

  // Test
  this.sprites.test.anchor.set(0.5)
  // this.app.stage.addChild(this.sprites.test)

  // Sun
  this.sprites.sun.anchor.set(0.5)
  this.sprites.sun.scale.set(0.5)
  this.app.stage.addChild(this.sprites.sun)

  // Moon
  this.sprites.moon.anchor.set(0.5)
  this.sprites.moon.scale.set(0.5)
  // this.app.stage.addChild(this.sprites.moon)

  // Soil
  this.app.stage.addChild(this.sprites.soil)

  // Date/Time
  this.interface = {}
  this.interface.textMargin = 10
  this.interface.textHeight = PIXI.TextMetrics.measureText('EXAMPLE', new PIXI.TextStyle(defaultFontStyle)).lineHeight
  this.interface.title = new PIXI.Text('Flora', titleFontStyle)
  this.interface.season = new PIXI.Text('SEASON', defaultFontStyle)
  this.interface.time = new PIXI.Text('TIME', defaultFontStyle)
  this.interface.day = new PIXI.Text('DAY', defaultFontStyle)
  this.interface.year = new PIXI.Text('YEAR', defaultFontStyle)
  this.interface.time.anchor.set(1, 0)
  this.interface.day.anchor.set(1, 0)
  this.interface.year.anchor.set(1, 0)
  this.interface.season.anchor.set(1, 0)
  this.app.stage.addChild(this.interface.title)
  this.app.stage.addChild(this.interface.season)
  this.app.stage.addChild(this.interface.time)
  this.app.stage.addChild(this.interface.day)
  this.app.stage.addChild(this.interface.year)
}

//
// Initialize environment objects
//
Flora.prototype.initializeEnvironment = function () {
  this.state = {
    time: 0,
    timeFactor: 0.25,
    timeInDay: 1440,
    day: 1,
    dayOfSeason: 1,
    daysInSeason: 5,
    season: 1,
    year: 1
  }
  this.time = new FloraTime(this.state)
}

//
// Start
//
Flora.prototype.start = function () {
  setInterval(() => {
    this.update()
    this.draw()
  }, 33 * this.state.timeFactor)
}

//
// Process the next step in the simulation
// and update the state
//
Flora.prototype.update = function () {
  this.time.update()
}

//
// Calculate visual updates based on state
// changes behind the scenes
//
Flora.prototype.draw = function () {
  // Handle interface resizing (initial render/on resize)
  if (this.screenSizeChanged) this.redrawInterface()

  this.updateInterfaceText()
  this.drawEnvironment()
}

//
// Draw all static interface objects
//
Flora.prototype.redrawInterface = function () {
  console.log(`[Flora] Redrawing interface for ${window.innerWidth}x${window.innerHeight}`)
  this.screenSizeChanged = false
  this.app.renderer.resize(window.innerWidth, window.innerHeight)
  this.interface.title.position.set(this.interface.textMargin, this.interface.textMargin)
  this.interface.season.position.set(window.innerWidth - this.interface.textMargin, this.interface.textMargin)
  this.interface.time.position.set(window.innerWidth - this.interface.textMargin, this.interface.textHeight + this.interface.textMargin)
  this.interface.day.position.set(window.innerWidth - this.interface.textMargin, 2 * this.interface.textHeight + this.interface.textMargin)
  this.interface.year.position.set(window.innerWidth - this.interface.textMargin, 3 * this.interface.textHeight + this.interface.textMargin)
  this.sprites.soil.height = window.innerHeight * 0.2
  this.sprites.soil.width = window.innerWidth
  this.sprites.soil.position.y = window.innerHeight - this.sprites.soil.height
}

//
// Update interface text displays
//
Flora.prototype.updateInterfaceText = function () {
  this.interface.season.text = `${this.time.seasonString(true)}`
  this.interface.time.text = `TIME ${this.time.timeString()}`
  this.interface.day.text = `DAY ${this.state.day}`
  this.interface.year.text = `YEAR ${this.state.year}`
}

//
// Draw environment (sun, moon, stars, sky etc)
//
Flora.prototype.drawEnvironment = function () {
  // Sunrise/sunset at proper time
  const daylightLength = this.time.daylightMinutes()
  const daylightStart = (this.state.timeInDay * 0.5) - (daylightLength * 0.5)
  const daylightEnd = (this.state.timeInDay * 0.5) + (daylightLength * 0.5)
  const isDaylight = this.state.time >= daylightStart && this.state.time <= daylightEnd
  const daylightTime = this.state.time - ((this.state.timeInDay - daylightLength) / 2)

  // Calculate sun position
  const sunHeightRatio = Math.max(0, Math.sin((daylightTime / daylightLength) * Math.PI))
  const sunWidth = window.innerWidth + 400

  this.sprites.sun.visible = isDaylight
  this.sprites.sun.x = -200 + (sunWidth / daylightLength) * daylightTime
  this.sprites.sun.y = window.innerHeight * (1 - sunHeightRatio)

  // Sun/sky colour
  this.sprites.sun.tint = FloraColour.hsvToPixiString(42, (1.2 - sunHeightRatio) * 100, 100)
  this.app.renderer.backgroundColor = FloraColour.hsvToPixiString(215, 30, (0.1 + sunHeightRatio) * 100)
}
