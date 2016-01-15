import GameSprite from './GameSprite'

export default class Tile extends GameSprite {
  constructor (game, mx, my, realX, realY, group) {
    super(game, realX, realY, 'map_spritesheet', 'rock_1', group)
    this.mx = mx
    this.my = my
    this.realX = realX
    this.realY = realY
    this.scale.setTo(0.5, 0.5)
  }
}
