import TileSprite from './TileSprite'

export default class Trapdoor extends TileSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, context) {
    super(game, mx, my, map, context, 'trapdoor_closed')
  }

  openTrap () {
    this.loadTexture('trapdoor_open')
  }
}
