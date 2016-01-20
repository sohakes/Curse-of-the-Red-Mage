export default class GameSprite extends Phaser.Sprite {
  constructor (game, x, y, key, frame, group) {
    group = group || game.world

    super(game, x, y, key, frame)

    //this.anchor.set(0.5)

    this.animation = null

    group.add(this)
  }

  getCenter () {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    }
  }
}
