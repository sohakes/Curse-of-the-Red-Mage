import TileSprite from './TileSprite'

export default class Character extends TileSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, type, context) {
    super(game, mx, my, map, context, 'character')

    this.game = game

    this.context.characterGroup.add(this)

    this.lightDegradation = {
      sameDir: 0.01 + this.context.level/50,
      curve: 0.05 + this.context.level/50
    }

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.justWalked = false

    this.playerType = type

    this.surroundings = []



    if (type === 1) {
      this.tint = 0xff00ff
      this.setMovementType(type)
    } else if (type === 2){
      this.tint = 0x0000ff
      this.setMovementType(type)
    } else if (type === 3) {
      this.tint = 0xff00ff
      this.currentPlayer = 1
      this.setMovementType(this.currentPlayer)
    }

    this.tintAll(this.mx, this.my)

  }

  kill () {
    this.surroundings.map(function (el) {
      el[0].setLight(0, this.getPlayerColor(), this.playerType);
      el[0].explored = false
    }.bind(this));
    this.destroy()
  }

  die () {
    if (this.dead) {
      return
    }
    this.dead = true
    let smoke = this.game.add.sprite(this.x, this.y, 'smoke')
    this.game.add.tween(smoke).to( { alpha: 0 }, 1000,
      Phaser.Easing.Linear.None, true, 0);
    super.destroy()
  }

  tintAll (mx, my) {

    this.surroundings.map(function (el) {
      el[0].setLight(0, this.getPlayerColor(), this.playerType);
      el[0].explored = false
    }.bind(this));

    let explored = [];
    let frontier = [];
    frontier.push([this.map.grid[mx][my], 1.0, {'N': true, 'S': true, 'E': true, 'W': true}]);
    let directions = {'N': [0,-1], 'S': [0,1], 'E': [1,0], 'W': [-1,0]};

    while (frontier.length > 0) {
      let cur = frontier.shift();
      let cx = cur[0].mx;
      let cy = cur[0].my;
      //console.log(cur);
      explored.push(cur);
      cur[0].explored = this.playerType;

      if (cur[0].obstacle) {
        cur[1] -= 0.1
        if (cur[1] < 0) {
          cur[1] = 0
        }
        continue;
      }

      for (let dir in directions) {
        let nx = cx + directions[dir][0];
        let ny = cy + directions[dir][1];

        let light = cur[1] - (dir in cur[2] ? this.lightDegradation.sameDir
          : this.lightDegradation.curve);
        if (this.map.grid[nx][ny].explored != this.playerType && light > 0.01) {
          frontier.push([this.map.grid[nx][ny], light, {dir: true}]);
        }
      }
    }

    this.surroundings = explored;

    for (let i in this.surroundings) {
      this.surroundings[i][0].setLight(this.surroundings[i][1],
        this.getPlayerColor(), this.playerType)
    }
  }

  getColor (r, g, b) {
    return {
      r,
      g,
      b
    }
  }


  move (direction) {
    if (this.justWalked) {
      return
    }

    if (this.playerType === 3) {
      this.switchPlayer()
    }

    let beforeX = this.mx
    let beforeY = this.my

    if (direction == 0) { //left
      this.mx--
    } else if (direction == 1) { //down
      this.my++
    } else if (direction == 2) { //right
      this.mx++
    } else if (direction == 3) { //up
      this.my--
    }

    if (!this.valid (this.mx, this.my)) {
      this.mx = beforeX
      this.my = beforeY
      return
    }

    this.x = this.map.grid[this.mx][this.my].realX
    this.y = this.map.grid[this.mx][this.my].realY

    this.updateRealPos ()

    this.justWalked = true
    this.game.time.events.add(Phaser.Timer.SECOND * 0.1, function () {
      this.justWalked = false
    }, this);

    let color = 0x000000
    if (this.playerType === 1) {
      this.tintAll(this.mx, this.my, this.getPlayerColor())
    } else {
      this.tintAll(this.mx, this.my, this.getPlayerColor())
    }
  }

  getPlayerColor () {
    if (this.playerType === 1) {
      return this.getColor(255, 0, 255)
    } else if (this.playerType === 2){
      return this.getColor(0, 0, 255)
    }

    //D:
    if (this.playerType === 3) {
      if (this.currentPlayer === 1) {
        return this.getColor(255, 0, 255)
      } else if (this.currentPlayer === 2){
        return this.getColor(0, 0, 255)
      }
    }
    this.currentPlayer
  }

  setMovementType (type) {
    if (type === 1) {
      this.movement = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      }
    } else if (type === 2){
      this.movement = this.cursors
    }
  }

  switchPlayer () {
    if (this.playerType !== 3) {
      return
    }

    if (this.currentPlayer === 1) {
      this.currentPlayer = 2
      this.tint = 0x0000ff
    } else {
      this.currentPlayer = 1
      this.tint = 0xff00ff
    }

    this.setMovementType(this.currentPlayer)
  }


  update () {
    if (!this.context.started) {
      return
    }
    if (this.movement.left.isDown) {
      this.move(0)
    } else if (this.movement.down.isDown) {
      this.move(1)
    } else if (this.movement.right.isDown) {
      this.move(2)
    } else if (this.movement.up.isDown) {
      this.move(3)
    }
  }

  valid (x, y) {
    return this.map.grid[x][y].isWalkable()
  }

  validTemp (x, y) {
    return true
  }
}
