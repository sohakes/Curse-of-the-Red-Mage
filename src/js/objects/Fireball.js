import GameSprite from './GameSprite'

export default class Fireball extends GameSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, x, y, goX, goY, map, context) {
    super(game, x, y, 'fireball')

    this.anchor.x = 0.5
    this.anchor.y = 0.5

    this.game = context.game

    this.context = context

    this.context.registerUpdate.push(this)

    this.map = map

    let velocity = 50 + this.context.switch * 5

    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    let difX = goX - x
    let difY = goY - y

    let magnitude = Math.sqrt(Math.pow((difX), 2) + Math.pow((difY), 2))

    this.body.velocity.x = difX * velocity / magnitude
    this.body.velocity.y = difY * velocity / magnitude
  }

  getMxMy () {

    return {
      mx: Math.floor(this.x / this.map.widthTile),
      my: Math.floor(this.y / this.map.heightTile)
    }
  }

  update () {
    let mapPos = this.getMxMy()
    //if(this.map.grid[mapPos.mx][mapPos.my])
    //  this.map.grid[mapPos.mx][mapPos.my].setDebugText("Here"+Math.random())
    if (this.context.character3.isSamePlace(mapPos)) {
      this.context.lost()
    }
  }
}
