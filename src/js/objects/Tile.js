import GameSprite from './GameSprite'

export default class Tile extends GameSprite {
  constructor (game, mx, my, realX, realY, group, obstacle) {
    obstacle = obstacle || null
    super(game, realX, realY, 'map_spritesheet', 'grass_1', group)
    this.mx = mx
    this.my = my
    this.realX = realX
    this.realY = realY
    this.obstacle = obstacle
    this.scale.setTo(this.game.gameScale, this.game.gameScale)
    this.tint = 0x000000
    this.intensity = 0
    this.lightSources = {}
    this.explored = 0

    let style = { font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.width};
    this.text = this.game.add.text(realX, realY, this.getTileDebugText(), style);
  }

  getTileDebugText () {
    let text = ""
    for (let source in this.lightSources) {
      if (this.lightSources.hasOwnProperty(source)) {
        text += source + ": " + this.lightSources[source].toPrecision(2) + "\n"
      }
    }
    return ""
    return text + "int: " + this.intensity.toPrecision(2)
  }

  isWalkable () {
    return this.obstacle == null
  }

  //at least one of the values of r, g and b must be 255
  setLight (intensity, color, lightSource) {
    let rgbToHex = function (r, g, b) {
      return r << 16 | g << 8 | b
    }

    if (!lightSource) {
      console.log("error")
    }

    this.lightSources[lightSource] = intensity


    //console.log("first"+intensity)

    for (let source in this.lightSources) {
      if (this.lightSources.hasOwnProperty(source)) {
          //blend the colors. For now just the intensity
        if (lightSource != source) {
          intensity += this.lightSources[source]
        }
      }
    }

    if (intensity > 1) {
      intensity = 1
    }

    this.intensity = intensity

    this.text.text = this.getTileDebugText()

    //console.log("second"+intensity)

    let nr = intensity * color.r
    let ng = intensity * color.g
    let nb = intensity * color.b
    //console.log(rgbToHex (nr, ng, nb))
    let light = rgbToHex (nr, ng, nb)
    this.tint = light
    if (this.obstacle != null) {
      this.obstacle.tint = light
    }
  }
}
