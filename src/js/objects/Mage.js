import TileSprite from './TileSprite'

export default class Mage extends TileSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, context) {
    super(game, mx, my, map, context, 'mage')

    this.tint = 0xff0000
  }
}
