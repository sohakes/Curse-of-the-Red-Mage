import GameSprite from './GameSprite'

export default class TileSprite extends GameSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, context, key, frame, group) {
    super(game, map.grid[mx][my].realX, map.grid[mx][my].realY, key, frame, group)

    this.context = context

    this.mx = mx

    this.my = my

    this.game = game

    this.map = map

    this.associatedTile = map.grid[mx][my]

    this.scale.setTo(this.game.gameScale, this.game.gameScale)
  }

  isSamePlace (object) {
    if (this.mx === object.mx && this.my === object.my) {
      return true
    }
  }
}
