export default class Kraiom {
  create () {
    this.game.stage.backgroundColor = '#2D4548'

    const logo = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'kraiom'
    )

    logo.anchor.setTo(0.5)

    setTimeout(() => this.state.start('menu', true, false), 3000)
  }
}
