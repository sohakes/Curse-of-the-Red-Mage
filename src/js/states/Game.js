import Map from '../map/Map'
import Character from '../objects/Character'

export default class Game {
  create () {
    this.game.gameScale = 1.2

    this.game.world.setBounds(0, 0, GAME.width, GAME.height)

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.game.isPaused = false

    let mapWidth = Math.floor(20 / this.game.gameScale)
    let mapHeight = Math.floor(12 / this.game.gameScale)

    this.map = new Map(this.game, mapWidth, mapHeight,
       40 * this.game.gameScale, 40 * this.game.gameScale, 0, 0)

    let start1 = (this.map.grid[1][1].obstacle ? [1,2] : [1,1]);

    this.character = new Character(this.game, start1[0], start1[1], this.map, 1)

    let start2 = (this.map.grid[mapWidth - 2][mapHeight - 2].obstacle ?
       [mapWidth - 2,mapHeight - 3] : [mapWidth - 2,mapHeight - 2]);

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
