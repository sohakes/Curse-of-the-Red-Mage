const big_text = {
  font: 'Arial',
  fontSize: '50px',
  fontWeight: 100,
  fill: '#ffffff'
}

const big_countdown_text = {
  font: 'Arial',
  fontSize: '50px',
  fontWeight: 100,
  fill: '#ff0000'
}

const smaller_text = {
  font: 'Arial',
  fontSize: '28px',
  fontWeight: 100,
  fill: '#ffffff'
}

export default class UI {
  constructor (context) {
    this.context = context
    this.game = context.game

    //this.game.add.button(this.game.world.width - 50, 10, 'pause_button',
    //  this.pause, this)
  }

  endStart () {
    this.startTimer.y = 20
    this.startTimer.setText("Go!")
    this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
      this.startTimer.destroy()
    }, this);
  }

  buildInterface () {
    this.timer = this.game.add.text(
      10,
      10,
      Math.ceil(this.context.timeToLose),
      {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    this.score = this.game.add.text(
      this.game.world.width - 10,
      10,
      "score: " + Math.floor(this.context.data.score),
      {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    this.startTimer = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      3 - this.context.startTime.seconds,
      big_text
    )

    this.score.anchor.setTo(1, 0)
    this.timer.anchor.setTo(0, 0)
    this.startTimer.anchor.setTo(0.5, 0.5)
  }

  update () {
    if (!this.context.endFlag) {
      this.timer.setText(Math.ceil(this.context.timeToLose - this.context.runningTime.seconds))
    }

    if (!this.context.started) {
      this.startTimer.setText(Math.ceil(3 - this.context.startTime.seconds))
    }
  }



  lost () {
    const lostText = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 100,
      'You lost!',
      big_text
    )

    lostText.anchor.setTo(0.5, 0.5)

    const lostTextSub = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'You both died :(. Press ENTER to go back to menu.',
      smaller_text
    )

    lostTextSub.anchor.setTo(0.5, 0.5)
  }

  gameWon () {
    const wonText = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 100,
      'You won!',
      big_text
    )

    wonText.anchor.setTo(0.5, 0.5)

    const wonTextSub = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Your score is ' + this.context.data.score
        + '. Press ENTER to go back to menu',
      smaller_text
    )

    wonTextSub.anchor.setTo(0.5, 0.5)
  }

  pause () {
    //this.context.pause()
  }

  resume () {
    //this.pauseMenu.hideMenu()
    //this.context.resume()
  }

  levelSelect () {
    //this.resume ()
    //this.game.state.start('levelselect', true, false, {})
  }

  mainMenu () {
    //this.resume ()
    //this.game.state.start('menu', true, false, {})
  }
}
