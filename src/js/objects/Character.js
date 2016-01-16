import GameSprite from './GameSprite'

export default class Character extends GameSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map, type) {
    super(game, map.grid[mx][my].realX, map.grid[mx][my].realY, 'character')

    this.mx = mx

    this.my = my

    this.game = game

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.justWalked = false

    this.map = map

    this.scale.setTo(0.5, 0.5)

    this.playerType = type

    this.surroundings = []

    if (type == 1) {
      this.movement = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      }
    } else {
      this.movement = this.cursors
    }
    if (type == 1) {
      this.tintAll(this.mx, this.my, this.map.grid[this.mx][this.my].getLight(1, 255, 0, 0))
  } else {
      this.tintAll(this.mx, this.my, this.map.grid[this.mx][this.my].getLight(1, 0, 0, 255))
    }}

  tintAll (mx, my, color) {

    this.surroundings.map(function (el) { el[0].setLight(0x000000); el[0].explored = false});

    let explored = [];
    let frontier = [];
    frontier.push([this.map.grid[mx][my], 1.0, {'N': true, 'S': true, 'E': true, 'W': true}]);
    let directions = {'N': [0,-1], 'S': [0,1], 'E': [1,0], 'W': [-1,0]};

    while (frontier.length > 0) {
      let cur = frontier.pop();
      let cx = cur[0].mx;
      let cy = cur[0].my;
      console.log(cur);
      explored.push(cur);
      cur[0].explored = true;

      if (cur[0].obstacle) continue;

      for (let dir in directions) {
        let nx = cx + directions[dir][0];
        let ny = cy + directions[dir][1];

        let light = cur[1] - (dir in cur[2] ? 0.05 : 0.1);
        if (!this.map.grid[nx][ny].explored && light > 0.01) {
          frontier.push([this.map.grid[nx][ny], light, {dir: true}]);
        }
      }
    }

    this.surroundings = explored;

    for (let i in this.surroundings) {
      this.surroundings[i][0].setLight(this.getColor(  this.surroundings[i][1]))
    }
  }


  move (direction) {
    if (this.justWalked) {
      return
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

    this.justWalked = true
    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
      this.justWalked = false
    }, this);

    let color = 0x000000
    if (this.playerType == 1) {
      this.tintAll(this.mx, this.my, this.getColor(1))
    } else {
      this.tintAll(this.mx, this.my, this.getColor(1))
    }
  }

  getColor (intensity) {
    if (this.playerType == 1) {
      return this.map.grid[this.mx][this.my].getLight(intensity, 255, 255, 255)
    } else {
      return this.map.grid[this.mx][this.my].getLight(intensity, 255, 255, 255)
    }
  }


  update () {
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
