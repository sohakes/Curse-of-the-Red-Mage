const textFont = 'comic sans'

const styling = {
  font: textFont,
  fontSize: '72px',
  fontWeight: 100,
  fill: '#ffffff'
}

const sub_styling = {
  font: textFont,
  fontSize: '50px',
  fontWeight: 100,
  fill: '#ffffff'
}

const button_style = {
  font: textFont,
  fontSize: '28px',
  fontWeight: 100,
  fill: '#000000'
}

const button_style_over = {
  font: textFont,
  fontSize: '28px',
  fontWeight: 100,
  fill: "#333333"
}

export default class Menu {
  preload () {
    this.game.stage.backgroundColor = '#10101C'
  }

  create () {
    let bg = this.game.add.sprite (this.game.width / 2,
      this.game.height / 2, 'menuimg')
    bg.anchor.setTo(0.5, 0.5)

    this.title = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 50,
      "Colorful People Quest",
      styling
    )

    this.subtitle = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 10,
      "Curse of The Red Mage",
      sub_styling
    )

    this.start = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 150,
      'Start',
      button_style
    )

    this.credits = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY + 200,
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
    this.subtitle.anchor.setTo(0.5)
    this.start.anchor.setTo(0.5)
    this.credits.anchor.setTo(0.5)
  }
}
