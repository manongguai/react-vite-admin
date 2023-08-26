export default function initBackground(
  snowNumber = 20,
  snowSize = 4,
  speed = 1
) {
  let canvas = document.getElementById('canvas') as HTMLCanvasElement
  let context = canvas.getContext('2d') as CanvasRenderingContext2D
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const Snow = function (
    x: number,
    y: number,
    scale: number,
    rotate: number,
    speedX: number,
    speedY: number,
    speedR: number
  ) {
    this.x = x
    this.y = y
    this.scale = scale
    this.rotate = rotate
    this.speedX = speedX
    this.speedY = speedY
    this.speedR = speedR
  }

  Snow.prototype.render = function () {
    context.save() //- 保存画布原来的位置
    context.beginPath() //- 开启路径
    context.translate(this.x, this.y) //- 移动画布  x y
    context.scale(this.scale, this.scale) //- 缩放比例
    context.rotate((this.rotate * Math.PI) / 180)
    context.moveTo(-snowSize, 0) //- 线的开始位置
    context.lineTo(snowSize, 0) //-  线结束的位置
    context.strokeStyle = '#fff' //- 颜色
    context.lineWidth = 2 //- 宽度
    context.lineCap = 'round' //- 圆角
    context.stroke() //- 开始进行绘画
    //- 角度转弧度的计算
    let disX = Math.sin((30 * Math.PI) / 180) * snowSize
    let disY = Math.sin((60 * Math.PI) / 180) * snowSize
    /* 第二条线 */
    context.moveTo(-disX, disY)
    context.lineTo(disX, -disY)
    //- 第三条线
    context.moveTo(-disX, -disY)
    context.lineTo(disX, disY)
    context.stroke() //- 开始进行重复绘画
    context.restore() //- 绘画完成恢复原来的位置
    context.closePath() //- 关闭绘画路径
  }

  let snowArr: any[] = []

  let init = function () {
    for (let i = 0; i < snowNumber; i++) {
      let x = Math.random() * canvas.width
      let scale = Math.random() + 0.1 //- 缩放比例欸
      let rotate = Math.random() * 60 //- 旋转的角度
      let speedX = Math.random() + speed //- x轴移动的速度
      let speedY = Math.random() + speed //- 下降的速度
      let speedR = Math.random() * 3 + speed //- 旋转的速度
      ;(function (x, y, scale, rotate, speedX, speedY, speedR) {
        setTimeout(function () {
          let snow = new (Snow as any)(
            x,
            y,
            scale,
            rotate,
            speedX,
            speedY,
            speedR
          )
          snow.render()
          snowArr.push(snow)
        }, Math.random() * 8000)
      })(x, 0, scale, rotate, speedX, speedY, speedR)
    }
    snowing()
  }
  function snowing() {
    //- 收集生成的雪花对象，进行重置操作，改变生成位置，
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < snowArr.length; i++) {
      snowArr[i].x = (snowArr[i].x + snowArr[i].speedX) % canvas.width
      snowArr[i].y = (snowArr[i].y + snowArr[i].speedY) % canvas.height
      snowArr[i].rotate = (snowArr[i].rotate + snowArr[i].speedR) % 60
      snowArr[i].render()
    }
    window.requestAnimationFrame(snowing)
  }
  init()
}
