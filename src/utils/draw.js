const defaultStyle = {
  lineWidth: 5,
  lineJoin: 'round',
  lineCap: 'round',
}

export default class Draw {
  constructor(ctx, canvasStyle = defaultStyle) {
    this.ctx = ctx
    this.setDrawStyle(canvasStyle)
  }

  setDrawStyle(styles) {
    Object.entries(styles).forEach(([k, v]) => this.ctx[k] = v)
    return this
  }

  line(x, y, tox, toy) {
    if (!tox) {
      tox = x
      toy = y
      x--
      y--
    }
    this._lineTo(x, y, tox, toy)
    return this
  }

  _lineTo(x, y, tox, toy) {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(tox, toy)
    ctx.stroke()
    ctx.closePath()
  }

  clear(width, height) {
    this.ctx.clearRect(0, 0, width, height)
    return this
  }
}