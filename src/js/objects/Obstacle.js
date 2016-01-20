import GameSprite from './GameSprite'

export default class Obstacle extends GameSprite {
  constructor (game, mx, my, realX, realY, group) {
    super(game, realX, realY, 'wall',  null, group)
    this.mx = mx
    this.my = my
    this.realX = realX
    this.realY = realY
    this.scale.setTo(this.game.gameScale, this.game.gameScale)
    this.tint = 0x000000
  }
}
