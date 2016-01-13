import Tile from '../objects/Tile'

export default class Map {
  constructor (widthMap, heightMap, widthTile, heightTile, startX, startY) {
    this.startX = startX
    this.startY = startY
    this.widthTile = widthTile
    this.heightTile = heightTile
    this.grid = []
    this.widthMap = widthMap
    this.heightMap = heightMap
    this.createMap(widthMap, heightMap, this.grid)
  }

  createMap (widthMap, heightMap, grid) {
    //Position (x, y) = (0, 0) is the top left corner
    for (let i = 0; i < widthMap; i++) {
      let row = []
      for (let j = 0; j < heightMap; j++) {
        let position = this.getRealTilePosition(i, j)
        row.push(new Tile(i, j, position.x, position.y))
      }
      grid.push(row)
    }
  }

  getRealTilePosition (mx, my) {
    let realX = this.startX + mx * this.widthTile
    let realY = this.startY + my * this.heightTile
    return {
      x: realX,
      y: realY
    }
  }
}
