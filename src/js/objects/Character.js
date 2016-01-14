import GameSprite from './GameSprite'

export default class Character extends GameSprite {
  //constructor (game, x, y, key, frame, group) {
  constructor (game, mx, my, map) {
    super(game, map.grid[mx][my].realX, map.grid[mx][my].realY, 'character')

    this.mx = mx

    this.my = my

    this.game = game

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.justWalked = false

    this.map = map
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
  }



  update () {

    if (this.cursors.left.isDown) {
      this.move(0)
    } else if (this.cursors.down.isDown) {
      this.move(1)
    } else if (this.cursors.right.isDown) {
      this.move(2)
    } else if (this.cursors.up.isDown) {
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
}
