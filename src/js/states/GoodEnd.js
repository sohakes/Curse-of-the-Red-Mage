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

export default class GoodEnd {
  create () {
    this.game.stage.backgroundColor = '#2D4548'

    this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    let bg = this.game.add.sprite (this.game.width / 2,
      this.game.height / 2, 'theend')
    bg.anchor.setTo(0.5, 0.5)


    this.endText1 = this.add.text(
      10,
      10,
      ` The blue and pink people defeated the mage
 after activating a trap hole that, for some strange
 reason, was beneath him.
      `,
      normal_text
    )

    this.endText2 = this.add.text(
      this.game.width - 10,
      this.game.height - 20,
      ` And they both probably lived happily
 forever after.
      `,
      normal_text
    )



    this.endText2.anchor.setTo(1, 1)

    //this.introText.anchor.x = 0.5
    //this.introText.anchor.y = 0.5

    this.counter = 0

    const pressEnter = this.add.text(
      this.game.width,
      this.game.height,
      "Press ENTER to go back to the menu.",
      red_text
    )

    pressEnter.anchor.setTo(1)

    this.enterFlag = false;

  }

  update () {
    if (this.enterKey.isDown && this.enterFlag === false) {
        this.state.start('menu', true, false)
    }
  }
}
