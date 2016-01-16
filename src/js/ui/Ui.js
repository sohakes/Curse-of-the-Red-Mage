export default class UI {
  constructor (context) {
    this.context = context
    this.game = context.game

    //this.game.add.button(this.game.world.width - 50, 10, 'pause_button',
    //  this.pause, this)
  }

  buildInterface () {
    this.timer = this.game.add.text(
      10,
      10,
      this.context.runningTime.seconds,
      {
        font: '30px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    this.timer.anchor.setTo(0, 0)
  }

  update () {
    this.timer.setText(30 - Math.floor(this.context.runningTime.seconds))
  }

  lost () {
    
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
