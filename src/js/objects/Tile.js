import GameSprite from './GameSprite'

export default class Tile extends GameSprite {
  constructor (game, mx, my, realX, realY) {
    super(game, realX, realY, 'map_spritesheet', 'grass_1')
    this.mx = mx
    this.my = my
    this.realX = realX
    this.realY = realY
  }
}
