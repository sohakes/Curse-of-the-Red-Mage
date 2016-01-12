export default class Game {
  create () {
    this.game.world.setBounds(0, 0, GAME.width, GAME.height)

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.game.isPaused = false

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
