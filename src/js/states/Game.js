import Map from '../map/Map'
import Character from '../objects/Character'

export default class Game {
  create () {
    this.game.world.setBounds(0, 0, GAME.width, GAME.height)

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.game.isPaused = false

    this.map = new Map(10, 10, 32, 32, 0, 0)

    this.character = new Character(this.game, 2, 2, this.map)



    //this.game.map.initialize()
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
