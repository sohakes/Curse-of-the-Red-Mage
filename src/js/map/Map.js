import Tile from '../objects/Tile'
import Obstacle from '../objects/Obstacle'

export default class Map {
  constructor (game, widthMap, heightMap, widthTile, heightTile, startX, startY) {
    this.startX = startX
    this.startY = startY
    this.widthTile = widthTile
    this.heightTile = heightTile
    this.grid = []
    this.widthMap = widthMap
    this.heightMap = heightMap
    this.game = game
    this.tileGroup = this.game.add.group()
    this.objectGroup = this.game.add.group()
    this.createMap(widthMap, heightMap, this.grid)
  }

  createMap (widthMap, heightMap, grid) {
    //Position (x, y) = (0, 0) is the top left corner
    for (let i = 0; i < widthMap; i++) {
      let row = []
      for (let j = 0; j < heightMap; j++) {
        let position = this.getRealTilePosition(i, j)
        let obstacle = null;
        if (Math.random() < 0.3) {
          obstacle = new Obstacle(this.game, i, j, position.x,
            position.y, this.objectGroup)
        }
        row.push(new Tile(this.game, i, j, position.x, position.y,
          this.tileGroup, obstacle))
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
