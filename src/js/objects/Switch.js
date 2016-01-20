import TileSprite from './TileSprite'
import Fireball from './Fireball'

export default class Switch extends TileSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, context) {
    super(game, mx, my, map, context, 'switch')

    this.activated = false
  }

  update () {
    if (!this.activated && this.context.character3.isSamePlace(this)) {
      this.activated = true
      this.scale.x = - this.scale.x
      this.x -= this.width //All the cheap hacks
      this.context.switch++
      if (this.context.switch == 4) {
        this.context.won()
      }
    }
  }


}
