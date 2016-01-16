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

    let start1 = (this.map.grid[1][1].obstacle ? [1,2] : [1,1]);

    this.character = new Character(this.game, start1[0], start1[1], this.map, 1)

    let start2 = (this.map.grid[38][22].obstacle ? [38,21] : [38,22]);

    this.character = new Character(this.game, start2[0], start2[1], this.map, 2)
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
