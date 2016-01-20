import Tile from '../objects/Tile'
import Obstacle from '../objects/Obstacle'
import Switch from '../objects/Switch'

export default class Map {
  constructor (game, widthMap, heightMap, widthTile,
      heightTile, startX, startY, context) {
    this.context = context
    this.startX = startX
    this.startY = startY
    this.widthTile = widthTile
    this.heightTile = heightTile
    this.grid = []
    this.widthMap = widthMap
    this.heightMap = heightMap
    this.game = game
    this.tileGroup = this.context.tileGroup
    this.objectGroup = this.context.objectGroup
    console.log(widthMap, heightMap);
    this.createMap(widthMap, heightMap, this.grid)

    if (this.context.level === this.context.specialLevel) {
      let roomWidth = Math.floor(widthMap * 0.4)
      let roomHeight = Math.floor(heightMap * 0.4)

      if (roomWidth % 2 === 0) {
        roomWidth++
      }

      if (roomHeight % 2 === 0) {
        roomHeight++
      }

      let middleX = Math.floor(widthMap / 2)
      let middleY = Math.floor(heightMap / 2)

      let roomStartX = middleX - Math.floor(roomWidth / 2)
      let roomStartY = middleY - Math.floor(roomHeight / 2)

      for (let i = roomStartX; i < roomStartX + roomWidth; i++) {
        for (let j = roomStartY; j < roomStartY + roomHeight; j++) {
          if (this.grid[i][j].obstacle != null) {
            this.grid[i][j].obstacle.destroy()
            this.grid[i][j].obstacle = null
          }
        }
      }

      this.createSwitches = function () {
        let gswitch = new Switch(this.game, roomStartX, roomStartY,
          this, this.context)
        this.context.objectGroup.add(gswitch)

        gswitch = new Switch(this.game, roomStartX,
          roomStartY + roomHeight - 1, this, this.context)
          this.context.objectGroup.add(gswitch)

        gswitch = new Switch(this.game, roomStartX + roomWidth - 1,
          roomStartY, this, this.context)
          this.context.objectGroup.add(gswitch)

        gswitch = new Switch(this.game, roomStartX + roomWidth - 1,
          roomStartY + roomHeight - 1, this, this.context)
        this.context.objectGroup.add(gswitch)
      }

      this.grid[middleX][middleY - 2].setLight(1, this.getColor(255, 255, 255), 10)
      this.grid[middleX - 1][middleY - 2].setLight(1, this.getColor(255, 0, 255), 10)
      this.grid[middleX + 1][middleY - 2].setLight(1, this.getColor(0, 0, 255), 10)

      this.context.pinkTile = this.grid[middleX - 1][middleY - 2]
      this.context.blueTile = this.grid[middleX + 1][middleY - 2]
      this.context.fusionTile = this.grid[middleX][middleY - 2]

      let pinkPlat = this.game.add.sprite(this.context.pinkTile.x, this.context.pinkTile.y, 'platform')
      pinkPlat.tint = 0xffccff
      pinkPlat.scale.setTo(this.game.gameScale, this.game.gameScale)
      this.context.objectGroup.add(pinkPlat)
      let bluePlat = this.game.add.sprite(this.context.blueTile.x, this.context.pinkTile.y, 'platform')
      bluePlat.tint = 0xccccff
      bluePlat.scale.setTo(this.game.gameScale, this.game.gameScale)
      this.context.objectGroup.add(bluePlat)
      let fusionPlat = this.game.add.sprite(this.context.fusionTile.x, this.context.pinkTile.y, 'platform')
      fusionPlat.tint = 0xccffff
      fusionPlat.scale.setTo(this.game.gameScale, this.game.gameScale)
      this.context.objectGroup.add(fusionPlat)
    }
  }

  getColor (r, g, b) {
    return {
      r,
      g,
      b
    }
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

    var randInt = function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    var carveRandom = function (attempts, xT, yT, grid) {
      console.log(attempts)
      while (attempts--) {
        let x = randInt(1, xT-1);
        let y = randInt(1, yT-1);
        if (grid[x][y].state == true) {
          console.log('success');
          grid[x][y].state == false;
          grid[0][0].empties++;
        }
      }
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
        for (let x = 1; x < xT-1; x++) {
          for (let y = 1; y < yT-1; y++) {
            if (maze[x][y].state == false && wallcount(x, y, maze) == 3) {
              maze[x][y].state = true;
              amount--;
            }
            if (amount == 0) return;
          }
        }
      }
    }

    var uncarvePasses = function (passes, xT, yT, grid) {
      while (passes--) {
        for (let x = 1; x < xT-1; x++) {
          for (let y = 1; y < yT-1; y++) {
            if (grid[x][y].state == false && wallcount(x, y, grid) == 3) {
              grid[x][y].state = true;
              grid[0][0].empties--;
            }
          }
        }
      }
    }

    var maze = createStone(widthMap, heightMap);
    carveMaze(widthMap, heightMap, maze);

    let loopAtt = ((widthMap -2) * (heightMap -2) - maze[0][0].empties) * 0.05;
    carveRandom(Math.floor(loopAtt), widthMap, heightMap, maze);

    //uncarvePasses(1, widthMap, heightMap, maze);

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
