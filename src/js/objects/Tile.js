import GameSprite from './GameSprite'

export default class Tile extends GameSprite {
  constructor (game, mx, my, realX, realY, group, obstacle) {
    obstacle = obstacle || null
    super(game, realX, realY, 'map_spritesheet', 'grass_1', group)
    this.mx = mx
    this.my = my
    this.realX = realX
    this.realY = realY
    this.obstacle = obstacle
  }

  isWalkable () {
    return this.obstacle == null
  }
}
