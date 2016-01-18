import TileSprite from './TileSprite'
import Fireball from './Fireball'

export default class Mage extends TileSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, context) {
    super(game, mx, my, map, context, 'mage')

    this.tint = 0xff0000

    this.throwFireball()
  }

  throwFireball () {
    let fireball = new Fireball(this.game, this.realX, this.realY,
      this.context.character3.realX, this.context.character3.realY, this.map, this.context)

    this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
      this.throwFireball()
    }, this);
  }
}
