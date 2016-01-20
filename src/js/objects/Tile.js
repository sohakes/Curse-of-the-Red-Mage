import GameSprite from './GameSprite'

export default class Tile extends GameSprite {
  constructor (game, mx, my, realX, realY, group, obstacle) {
    obstacle = obstacle || null
    super(game, realX, realY, 'floor', null, group)
    this.mx = mx
    this.my = my
    this.realX = realX
    this.realY = realY
    this.obstacle = obstacle
    this.scale.setTo(this.game.gameScale, this.game.gameScale)
    this.tint = 0x000000
    this.intensity = 0
    this.lightSources = {}
    this.lightSourcesOverlay = {}
    this.explored = 0

    let rect = this.game.add.graphics(this.x, this.y)
    rect.lineStyle(0)
    rect.beginFill(0xffffff, 1)
    rect.drawRect(0, 0, this.width, this.height)
    rect.alpha = 0
    //rect.endFill()
    this.overlayRect = rect
    //this.game.context.overlayGroup.add(rect)

    let style = { font: "10px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: this.width};
    this.text = this.game.add.text(realX, realY, this.getTileDebugText(), style);
  }

  setDebugText (text) {
    this.text.setText(text)
  }

  getTileDebugText () {
    let text = ""
    for (let source in this.lightSources) {
      if (this.lightSources.hasOwnProperty(source)) {
        text += source + ": " + this.lightSources[source].toPrecision(2) + "\n"
      }
    }
    return ""
    //return text + "int: " + this.intensity.toPrecision(2)
  }

  getTileDebugTextOverlay () {
    let text = ""
    for (let source in this.lightSourcesOverlay) {
      if (this.lightSourcesOverlay.hasOwnProperty(source)) {
        text += source + ": " + this.lightSourcesOverlay[source] + "\n"
      }
    }
    return text
  }

  isWalkable () {
    return this.obstacle === null
  }

  getColor (r, g, b) {
    return {
      r,
      g,
      b
    }
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


    for (let source in this.lightSources) {
      if (this.lightSources.hasOwnProperty(source)) {
        //blend the colors. For now just the intensity
        intensity = Math.max(intensity, this.lightSources[source]);
      }
    }

    if (intensity > 1) {
      intensity = 1
    }

    this.intensity = intensity

    this.text.text = this.getTileDebugText()

    //console.log("second"+intensity)
    let colorIntensity = intensity
    let whiteLight = intensity * 255
    let nr = colorIntensity * color.r
    let ng = colorIntensity * color.g
    let nb = colorIntensity * color.b
    //console.log(rgbToHex (nr, ng, nb))
    let light = rgbToHex (whiteLight, whiteLight, whiteLight)

    this.tint = light
    if (this.obstacle != null) {
      this.obstacle.tint = light
    }

    this.lightSourcesOverlay[lightSource] = this.getColor(nr, ng, nb)

    let rsum = 0
    let gsum = 0
    let bsum = 0
    let total = 0
    for (let sourceOverlay in this.lightSourcesOverlay) {
      if (this.lightSourcesOverlay.hasOwnProperty(sourceOverlay)) {
        //blend the colors. For now just the intensity
        rsum += this.lightSourcesOverlay[sourceOverlay].r
          * this.lightSources[sourceOverlay]
        gsum += this.lightSourcesOverlay[sourceOverlay].g
          * this.lightSources[sourceOverlay]
        bsum += this.lightSourcesOverlay[sourceOverlay].b
          * this.lightSources[sourceOverlay]
        total += this.lightSources[sourceOverlay]
        //console.log("hey")
      }
    }

    if (rsum === 0 && gsum === 0 && bsum === 0) {
      this.overlayRect.alpha = 0
    } else {
      this.overlayRect.alpha = 0.2
      this.overlayRect.tint = rgbToHex(rsum / total, gsum / total, bsum / total)

    }
  }
}
