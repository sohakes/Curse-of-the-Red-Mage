import Game from './Game'
import Preload from './Preload'
import Boot from './Boot'
import Kraiom from './Kraiom'
import Menu from './Menu'
import About from './About'
import Intro from './Intro'
import GoodEnd from './GoodEnd'


const GAME_DATA = require('../../json/game')

window.GAME = function (handler) {
  Phaser.Game.prototype.GAME_DATA = GAME_DATA

  let game = new Phaser.Game(
    GAME_DATA.width,
    GAME_DATA.height,
    Phaser.AUTO,
    handler.target
  )

  game.state.add('boot', Boot)
  game.state.add('preload', Preload)
  game.state.add('game', Game)
  game.state.add('kraiom', Kraiom)
  game.state.add('menu', Menu)
  game.state.add('about', About)
  game.state.add('intro', Intro)
  game.state.add('goodend', GoodEnd)

  game.state.start('boot', true, false, handler)
}
