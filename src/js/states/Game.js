import Map from '../map/Map'
import Character from '../objects/Character'

export default class Game {
  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.world.setBounds(0, 0, GAME.width, GAME.height)

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.game.isPaused = false

    this.map = new Map(this.game, 40, 24, 20, 20, 0, 0)

    this.character = new Character(this.game, 2, 2, this.map, 1)

    this.character = new Character(this.game, 38, 22, this.map, 2)
  }
  

  init (data) {
    this.data = data
  }

  update () {

  }

  lost () {
  }

  won () {
  }

  pause () {

  }

  resume () {

  }
}
