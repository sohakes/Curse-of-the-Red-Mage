import TileSprite from './TileSprite'
import Fireball from './Fireball'

export default class Mage extends TileSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, context) {
    super(game, mx, my, map, context, 'mage')

    this.tint = 0xff0000

    this.throwFireball()
    this.throwFireballRandom()
  }

  throwFireball () {
    if (this.dead) {
      return
    }

    let mageCenter = this.getCenter()
    let characterCenter = this.context.character3.getCenter()
    let fireball = new Fireball(this.game, mageCenter.x, mageCenter.y,
      characterCenter.x , characterCenter.y, this.map, this.context)

    if (this.context.switch > 1) {

      let fireball2 = new Fireball(this.game, mageCenter.x, mageCenter.y,
        characterCenter.x -50, characterCenter.y+50, this.map, this.context)
      let fireball3 = new Fireball(this.game, mageCenter.x, mageCenter.y,
        characterCenter.x +50, characterCenter.y+50, this.map, this.context)
    }



    this.game.time.events.add(
      Phaser.Timer.SECOND * (3 - this.context.switch * 0.7), function () {
      this.throwFireball()
    }, this);
  }

  throwFireballRandom () {
    if (this.dead) {
      return
    }

    let mageCenter = this.getCenter()
    let characterCenter = this.context.character3.getCenter()

    let fireball3 = new Fireball(this.game, mageCenter.x, mageCenter.y,
      mageCenter.x + Math.random()-0.5, mageCenter.y + Math.random()-0.9, this.map, this.context)

    this.game.time.events.add(
      Phaser.Timer.SECOND * (2 - this.context.switch * 0.5), function () {
      this.throwFireballRandom()
    }, this);
  }

  die () {
    if (this.dead) {
      return
    }
    this.context.trapdoor.openTrap()
    this.dead = true
    let smoke = this.game.add.sprite(this.x, this.y, 'smoke')
    smoke.scale.setTo(this.game.gameScale, this.game.gameScale)
    this.game.add.tween(smoke).to( { alpha: 0 }, 1000,
      Phaser.Easing.Linear.None, true, 0);
    super.destroy()
  }
}
