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

const text_style_2 = {
  font: 'Arial',
  fontSize: '24px',
  fontWeight: 100,
  fill: '#ffffff'
}

const text_style = {
  font: 'Arial',
  fontSize: '18px',
  fontWeight: 100,
  fill: '#ffffff',
  wordWrap: true,
  wordWrapWidth: 430
}

const button_style_over = {
  font: 'Arial',
  fontSize: '28px',
  fontWeight: 100,
  fill: "#333333"
}

export default class About {
  preload () {

  }

  create () {
    const title = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY - 100,
      'We still dont know',
      styling
    )

    const back = this.add.text(
      this.game.world.width - 100,
      40,
      'Back',
      button_style
    )

    const cc = this.add.text(
      30,
      250,
      `Assets licensed under Creative Commons:
      By Attribution 3.0 License (creativecommons.org/licenses/by/3.0/)

      -
      -
      -
      - `,
      text_style
    )

    this.add.text(
      450,
      250,
      `Copyright © 2016

      Rafael Tomazela (rafaeltomazela.com)
      Guilherme Marques (???)`,
      text_style_2
    )

    back.inputEnabled = true
    back.input.useHandCursor = true

    back.events.onInputDown.add(() => {
      this.state.start('menu', true, false)
    })

    back.events.onInputOver.add(() => {
      back.setStyle(button_style_over)
    })

    back.events.onInputOut.add(() => {
      back.setStyle(button_style)
    })

    title.anchor.setTo(0.5)
    back.anchor.setTo(0.5)
  }
}
