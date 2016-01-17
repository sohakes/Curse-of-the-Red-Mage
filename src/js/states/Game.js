import Map from '../map/Map'
import Character from '../objects/Character'
import UI from '../ui/Ui'
const GAME = require('../../json/game.json')

export default class Game {
  create () {
    this.started = false

    this.level = this.data.level
    this.game.gameScale = 1.6 - this.level/15

    this.game.world.setBounds(0, 0, GAME.width, GAME.height)

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.game.isPaused = false

    let mapWidth = Math.floor(20 / this.game.gameScale)
    let mapHeight = Math.floor(12 / this.game.gameScale)

    this.map = new Map(this.game, mapWidth, mapHeight,
       40 * this.game.gameScale, 40 * this.game.gameScale, 0, 0)

    let start1 = (this.map.grid[1][1].obstacle ? [1,2] : [1,1]);

    this.character1 = new Character(this.game, start1[0], start1[1], this.map,
       1, this)

    let start2 = (this.map.grid[mapWidth - 2][mapHeight - 2].obstacle ?
       [mapWidth - 2,mapHeight - 3] : [mapWidth - 2,mapHeight - 2]);

    this.character2 = new Character(this.game, start2[0], start2[1], this.map,
       2, this)

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
    if (this.started === false) {

      if (this.startTime.seconds >= 3) {
        this.runningTime.start()
        this.started = true
        this.ui.endStart()
      }
      return
    }


    if (this.runningTime.seconds >= 10) {
      this.lost()
    }

    if (this.nextTo(this.character1.mx, this.character1.my, this.character2.mx,
        this.character2.my)) {
      this.won()
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

    if (this.level === 5) {
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
