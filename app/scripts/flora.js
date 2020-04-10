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
  this.app.renderer.backgroundColor = 0xD7EAF9
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
  this.loader.add('soil', 'images/soil.png')
             .add('sun', 'images/sun.png')
  this.loader.load((loader, resources) => {
    this.sprites.soil = new PIXI.TilingSprite(resources.soil.texture)
    this.sprites.sun = new PIXI.Sprite(resources.sun.texture)
    done()
  })
}

//
// Adds all objects to the stage etc
//
Flora.prototype.initializeInterface = function (done) {
  const defaultFontStyle = { fontFamily: 'monospace', fontSize: 14, fill: '#aaa' }

  // Sun
  this.sprites.sun.anchor.set(0.5)
  this.app.stage.addChild(this.sprites.sun)

  // Soil
  this.sprites.soil.width = innerWidth
  this.sprites.soil.height = 200
  this.app.stage.addChild(this.sprites.soil)

  // Date/Time
  this.interface = {}
  this.interface.textMargin = 10
  this.interface.textHeight = PIXI.TextMetrics.measureText('EXAMPLE', new PIXI.TextStyle(defaultFontStyle)).lineHeight
  this.interface.time = new PIXI.Text('TIME', defaultFontStyle)
  this.interface.day = new PIXI.Text('DAY', defaultFontStyle)
  this.interface.time.anchor.set(1, 0)
  this.interface.day.anchor.set(1, 0)
  this.app.stage.addChild(this.interface.time)
  this.app.stage.addChild(this.interface.day)
}

//
// Initialize environment objects
//
Flora.prototype.initializeEnvironment = function () {
  this.state = {
    time: 0,
    day: 1
  }
}

//
// Start
//
Flora.prototype.start = function () {
  setInterval(() => {
    this.update()
    this.draw()
  }, 33)
}


//
// Process the next step in the simulation
// and update the state
//
Flora.prototype.update = function () {
  if (this.state.time < 1440) this.state.time += 5
  else {
    this.state.time = 0
    this.state.day++
  }
}

//
// Calculate visual updates based on state
// changes behind the scenes
//
Flora.prototype.draw = function () {
  // Handle initial/further screen resizes
  if (this.screenSizeChanged) {
    this.screenSizeChanged = false
    this.app.renderer.resize(window.innerWidth, window.innerHeight)
    this.interface.time.position.x = window.innerWidth - this.interface.textMargin
    this.interface.time.position.y = this.interface.textMargin
    this.interface.day.position.x = window.innerWidth - this.interface.textMargin
    this.interface.day.position.y = this.interface.textHeight + this.interface.textMargin
    this.sprites.soil.position.y = window.innerHeight - this.sprites.soil.height
  }

  // Update text displays
  this.interface.day.text = `DAY ${this.state.day}`
  this.interface.time.text = `TIME ${this.state.time}` // TODO: human string

  // Calculate sun position
  this.sprites.sun.x = (window.innerWidth / 1440) * this.state.time
}
