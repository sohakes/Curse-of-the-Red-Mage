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

    if (direction == 0) { //left
      if (this.mx - 1 < 0) return;
      this.mx--
    } else if (direction == 1) { //down
      if (this.my + 1 >= this.map.heightMap) return;
      this.my++
    } else if (direction == 2) { //right
      if (this.mx + 1 >= this.map.widthMap) return;
      this.mx++
    } else if (direction == 3) { //up
      if (this.my - 1 < 0) return;
      this.my--
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

  valid (tile) {
    return true
  }
}
