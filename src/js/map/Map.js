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
    var createStone = function (xT, yT) {
      var maze = [];

      var x,y,row;

      for (x = 0; x < xT; x++) {
        row = [];
        for (y = 0; y < yT; y++) {
          row.push({x: x, y: y, state: true, empties: 0});
        }
        maze.push(row);
      }

      return maze;
    }

    var carveMaze = function (xT, yT, maze) {
      carve(maze[1][1], xT, yT, maze);
      return maze;
    }

    var carve = function (tile, xT, yT, maze) {
      if (tile.x == 0 || tile.x == xT-1 ||
          tile.y == 0 || tile.y == yT-1 ||
          tile.empties > 1) {
        return;
      }
      tile.state = false;
      // GAMBIS -> maze[0][0].empties will have the count of open tiles.
      maze[0][0].empties++;
      var neighbors = [];
      neighbors.push(maze[tile.x][tile.y-1]);
      neighbors.push(maze[tile.x][tile.y+1]);
      neighbors.push(maze[tile.x-1][tile.y]);
      neighbors.push(maze[tile.x+1][tile.y]);

      neighbors.forEach(function (el) {
        el.empties++;
      });

      neighbors.filter(function (el) {return el.empties == 1});

      neighbors.sort(function() {return 0.5-Math.random()});

      neighbors.forEach(function (el) {
        carve(el, xT, yT, maze);
      });
    }

    var wallcount = function (x, y, maze) {
      var cnt = 0;
      var dir = [[0,-1], [0,1], [1,0], [-1,0]];
      dir.forEach(function (el) {
        if (maze[x+el[0]][y+el[1]].state)
          cnt++;
      });
      return cnt;
    }

    var uncarve = function (amount, xT, yT, maze) {
      while(amount) {
        for (x = 1; x < xT-1; x++) {
          for (y = 1; y < yT-1; y++) {
            if (maze[x][y].state == false && wallcount(x, y, maze) == 3) {
              maze[x][y].state = true;
              amount--;
            }
            if (amount == 0) return;
          }
        }
      }
    }

    var maze = createStone(widthMap, heightMap);
    carveMaze(widthMap, heightMap, maze);

    //Position (x, y) = (0, 0) is the top left corner
    for (let i = 0; i < widthMap; i++) {
      let row = []
      for (let j = 0; j < heightMap; j++) {
        let position = this.getRealTilePosition(i, j)
        let obstacle = null;
        if (maze[i][j].state) {
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
