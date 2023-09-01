export default function initLoginBg() {
  let requestAnimation: number
  const windowWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  const windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight
  // var windowWidth = window.clientWidth;
  // var windowHeight = window.clientHeight;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const w = (canvas.width = windowWidth)
  const h = (canvas.height = windowHeight)
  const hue = 217
  const stars: IntStart[] = []
  const maxStars = 500 //星星数量
  let count = 0
  const canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D
  canvas2.width = 100
  canvas2.height = 100
  const half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
  gradient2.addColorStop(0.025, '#CCC')
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)')
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)')
  gradient2.addColorStop(1, 'transparent')

  ctx2.fillStyle = gradient2
  ctx2.beginPath()
  ctx2.arc(half, half, half, 0, Math.PI * 2)
  ctx2.fill()

  // End cache

  function random(min: number, max = 0) {
    if (arguments.length < 2) {
      max = min
      min = 0
    }

    if (min > max) {
      const hold = max
      max = min
      min = hold
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function maxOrbit(x: number, y: number) {
    const max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max))
    return diameter / 2
    //星星移动范围，值越大范围越小，
  }
  interface IntStart {
    orbitRadius: number
    radius: number
    orbitX: number
    orbitY: number
    timePassed: number
    speed: number
    alpha: number
    draw: () => void
  }
  const Star = function (this: IntStart) {
    this.orbitRadius = random(maxOrbit(w, h))
    this.radius = random(60, this.orbitRadius) / 18
    //星星大小
    this.orbitX = w / 2
    this.orbitY = h / 2
    this.timePassed = random(0, maxStars)
    this.speed = random(this.orbitRadius) / 500000
    //星星移动速度
    this.alpha = random(2, 10) / 10

    count++
    stars[count] = this
  }
  Star.prototype.draw = function () {
    const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10)

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }

    ctx.globalAlpha = this.alpha
    ctx.drawImage(
      canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    )
    this.timePassed += this.speed
  }

  for (let i = 0; i < maxStars; i++) {
    new Star.prototype.constructor()
  }

  function animation() {
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 0.5 //尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)'
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'lighter'
    for (let i = 1, l = stars.length; i < l; i++) {
      stars[i].draw()
    }

    requestAnimation = window.requestAnimationFrame(animation)
  }
  function stop() {
    cancelAnimationFrame(requestAnimation)
  }
  animation()
  return stop
}
