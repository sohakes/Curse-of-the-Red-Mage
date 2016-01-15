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
  }

  tintAll (mx, my, color) {
    if (this.validTemp(mx + 1, my)) {
      this.map.grid[mx + 1][my].setLight(color)
    }
    if (this.validTemp(mx - 1, my)) {
      this.map.grid[mx - 1][my].setLight(color)
    }
    if (this.validTemp(mx, my + 1)) {
      this.map.grid[mx][my + 1].setLight(color)
    }
    if (this.validTemp(mx, my - 1)) {
      this.map.grid[mx][my - 1].setLight(color)
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
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
      this.justWalked = false
    }, this);

    let color = 0x000000
    if (this.playerType == 1) {
      this.tintAll(this.mx, this.my, this.map.grid[this.mx][this.my].getLight(1, 255, 100, 100))
    } else {
      this.tintAll(this.mx, this.my, this.map.grid[this.mx][this.my].getLight(1, 100, 100, 255))
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
    if (x - 1 < 0) return false
    if (y + 1 >= this.map.heightMap) return false
    if (x + 1 >= this.map.widthMap) return false
    if (y - 1 < 0) return false
    if (!this.map.grid[x][y].isWalkable()) return false

    return true
  }

  validTemp (x, y) {
    if (x - 1 < 0) return false
    if (y + 1 >= this.map.heightMap) return false
    if (x + 1 >= this.map.widthMap) return false
    if (y - 1 < 0) return false

    return true
  }
}
