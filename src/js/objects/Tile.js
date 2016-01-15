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
    this.scale.setTo(0.5, 0.5)
    this.tint = 0x000000
  }

  isWalkable () {
    return this.obstacle == null
  }

  //at least one of the values of r, g and b must be 255
  getLight (intensity, r, g, b) {
    let rgbToHex = function (r, g, b) {
      return r << 16 | g << 8 | b
    }

    let nr = intensity * r
    let ng = intensity * g
    let nb = intensity * b
    console.log(rgbToHex (nr, ng, nb))
    return rgbToHex (nr, ng, nb)
  }

  setLight (color) {
    this.tint = color
    if (this.obstacle != null) {
      this.obstacle.tint = color
    }
  }
}
