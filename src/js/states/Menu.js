const styling = {
  font: 'Arial',
  fontSize: '72px',
  fontWeight: 100,
  fill: '#ffffff'
}

const button_style = {
  font: 'Arial',
  fontSize: '28px',
  fontWeight: 100,
  fill: '#ffffff'
}

const button_style_over = {
  font: 'Arial',
  fontSize: '28px',
  fontWeight: 100,
  fill: "#333333"
}

export default class Menu {
  preload () {
    this.game.stage.backgroundColor = '#10101C'
  }

  create () {
    this.title = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 100,
      "We dont know yet",
      styling
    )

    this.start = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 70,
      'Start',
      button_style
    )

    this.credits = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 170,
      'About',
      button_style
    )

    this.start.inputEnabled = true
    this.start.input.useHandCursor = true

    this.start.events.onInputDown.add(() => {
      this.state.start('intro', true, false,)
    })

    this.start.events.onInputOver.add(() => {
      this.start.setStyle(button_style_over)
    })

    this.start.events.onInputOut.add(() => {
      this.start.setStyle(button_style)
    })

    this.credits.inputEnabled = true
    this.credits.input.useHandCursor = true

    this.credits.events.onInputDown.add(() => {
      this.state.start('about', true, false)
    })

    this.credits.events.onInputOver.add(() => {
      this.credits.setStyle(button_style_over)
    })

    this.credits.events.onInputOut.add(() => {
      this.credits.setStyle(button_style)
    })

    this.title.anchor.setTo(0.5)
    this.start.anchor.setTo(0.5)
    this.credits.anchor.setTo(0.5)
  }
}
