const normal_text = {
  font: 'Arial',
  fontSize: '24px',
  fontWeight: 100,
  fill: '#ffffff'
}

const red_text = {
  font: 'Arial',
  fontSize: '28px',
  fontWeight: 100,
  fill: '#ff0000'
}

const GAME = require('../../json/game.json')

export default class Intro {
  create () {
    this.game.stage.backgroundColor = '#2D4548'

    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.introText = this.add.text(
      GAME.width / 2,
      GAME.height / 2,
      ` A great but bored mage wanted to have some fun. For that, he captured
        a blue and a pink person, threw them in a dungeon, and cast a curse
        upon them.

        Now they can't stay apart for more than 10 seconds, or else they simply
        disappear in a puff of smoke. Even if they get together, they will be
        separated again and will find themselves in another labyrinthic dungeon.

        Happily for our colored characters, the mage was good enough to give a
        torch to them, and let them free if they happen to get together five
        times. So, good luck!
      `,
      normal_text
    )

    this.introText.anchor.x = 0.5
    this.introText.anchor.y = 0.5

    this.counter = 0

    const pressEnter = this.add.text(
      this.game.width,
      this.game.height,
      "Press ENTER to continue",
      red_text
    )

    pressEnter.anchor.setTo(1)

    this.enterFlag = false;

  }

  update () {
    if (this.enterKey.isDown && this.enterFlag === false) {
      this.enterFlag = true
      this.counter++
      if (this.counter === 1) {
        this.introText.setText(`
          Control the blue person with the arrow keys.

          Control the pink person with the WASD keys.

          Good luck!

          (and beware of the monsters...)`)
      }

      if (this.counter === 2) {
        this.state.start('game', true, false, {
          level: 1
        })
      }
    }

      if (this.enterKey.isUp) {
        this.enterFlag = false
      }

  }
}
