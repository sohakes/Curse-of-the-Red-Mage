import Map from '../map/Map'
import Character from '../objects/Character'
import Mage from '../objects/Mage'
import UI from '../ui/Ui'
const GAME = require('../../json/game.json')

export default class Game {
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.started = false

    this.specialLevel = 2

    this.level = this.data.level
    if (this.level === this.specialLevel) {
      this.game.gameScale = 1
    } else {
      this.game.gameScale = 1.6 - this.level/15
    }

    this.activatedSpecial = false

    this.game.world.setBounds(0, 0, GAME.width, GAME.height)

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.game.isPaused = false

    this.timeToLose = 10

    let mapWidth = Math.floor(20 / this.game.gameScale)
    let mapHeight = Math.floor(12 / this.game.gameScale)

    this.map = new Map(this.game, mapWidth, mapHeight,
       40 * this.game.gameScale, 40 * this.game.gameScale, 0, 0, this)

    let start1 = (this.map.grid[1][1].obstacle ? [1,2] : [1,1]);

    this.character1 = new Character(this.game, start1[0], start1[1], this.map,
       1, this)

    let start2 = (this.map.grid[mapWidth - 2][mapHeight - 2].obstacle ?
       [mapWidth - 2,mapHeight - 3] : [mapWidth - 2,mapHeight - 2]);

    this.character2 = new Character(this.game, start2[0], start2[1], this.map,
       2, this)

    if (this.level === 6) {
      this.mage = new Mage(this.game, Math.floor(mapWidth/2),
        Math.floor(mapHeight/2) + 3, this.map, 2, this)
    }

    this.startTime = this.time.create(false)
    this.startTime.start()

    this.runningTime = this.time.create(false)
    //this.runningTime.start()

    if (!this.data.score) {
      this.data.score = 0
    }

    this.ui = new UI(this)

    this.ui.buildInterface()

    this.endFlag = false

    this.registerUpdate = []
  }


  init (data) {
    this.data = data
  }

  nextTo(x1, y1, x2, y2) {
    if (x1 == x2 && Math.abs(y1 - y2) <= 1) {
      return true
    }

    if (y1 == y2 && Math.abs(x1 - x2) <= 1) {
      return true
    }

    return false
  }

  update () {
    this.ui.update()

    this.registerUpdate.forEach((r) => {
      if (r !== null) {
        r.update()
      }
    })

    if (this.started === false) {

      if (this.startTime.seconds >= 3) {
        this.runningTime.start()
        this.started = true
        this.ui.endStart()
      }
      return
    }


    if (this.runningTime.seconds >= this.timeToLose) {
      this.lost()
    }

    if (this.specialLevel !== this.level
        && this.nextTo(this.character1.mx, this.character1.my,
        this.character2.mx, this.character2.my)) {
      this.won()
    } else {
      if (this.specialLevel === this.level
        && !this.activatedSpecial && this.character1.isSamePlace(this.pinkTile)
        && this.character2.isSamePlace(this.blueTile)) {
          this.character1.destroy()
          this.character2.destroy()
          this.character3 = new Character(this.game, this.fusionTile.mx,
            this.fusionTile.my, this.map, 3, this)

          this.mage = new Mage(this.game, this.fusionTile.mx,
            this.fusionTile.my + 4, this.map, this)
          this.activatedSpecial = true
          this.timeToLose = 30
        }
    }

    if (this.endFlag) {
      if (this.enterKey.isDown) {
        this.state.start('menu', true, false)
      }
    }

  }

  lost () {
    if (this.endFlag) {
      return
    }
    this.ui.lost()
    this.character1.destroy()
    this.character2.destroy()
    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.endFlag = true
  }

  won () {
    if (this.endFlag) {
      return
    }


    this.data.level++
    this.data.score += 10 - this.runningTime.seconds

    if (this.level === 6) {
      this.ui.gameWon()
      this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.endFlag = true
    } else {
      this.state.start('game', true, false, this.data)
    }

  }

  pause () {

  }

  resume () {

  }
}
