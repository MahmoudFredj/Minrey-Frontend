let diffrenceCoordMouseAndCrop
let canvas
class Crop {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.mouse = {
      x: 0,
      y: 0,
    }

    this.topLeft = {
      x: this.x,
      y: this.y,
      hover: false,
    }
    this.topRight = {
      x: this.x + this.width,
      y: this.y,
      hover: false,
    }
    this.bottomLeft = {
      x: this.x,
      y: this.y + this.height,
      hover: false,
    }
    this.bottomRight = {
      x: this.x + this.width,
      y: this.y + this.height,
      hover: false,
    }
    this.cornorRadius = 10
    this.displayCorno = true
  }

  draw(brush) {
    const datai = brush.getImageData(this.x, this.y, this.width, this.height)

    brush.fillStyle = 'rgb(60, 60, 60, 0.7)'
    brush.fillRect(0, 0, canvas.width, canvas.height)
    brush.putImageData(datai, this.x, this.y)
    if (this.displayCorno) {
      //   this.drawCircle(brush, this.topLeft)
      this.drawCircle(brush, this.topRight)
      //   this.drawCircle(brush, this.bottomLeft)
      //   this.drawCircle(brush, this.bottomRight)
    }
  }

  drawCircle(brush, cornor) {
    brush.fillStyle = cornor.hover ? 'green' : 'white'
    brush.beginPath()
    brush.arc(cornor.x, cornor.y, this.cornorRadius, 0, Math.PI * 2)
    brush.fill()
  }
  distance(a, b) {
    return Math.sqrt(
      Math.pow(b.x - a.x + canvas.getBoundingClientRect().x, 2) +
        Math.pow(b.y - a.y + canvas.getBoundingClientRect().y, 2),
    )
  }
  tick() {
    const canvasCoords = canvas.getBoundingClientRect()

    const mouse = this.mouse

    const cropCOS = {
      x: canvasCoords.x + this.x,
      y: canvasCoords.y + this.y,
    }
    // resizing
    const dist = {
      x: mouse.x - canvasCoords.x,
      y: mouse.y - canvasCoords.y,
    }
    // if (mouse.press && this.topLeft.hover) {
    //   this.width -= dist.x - this.x
    //   this.height -= dist.y - this.y
    //   this.x = mouse.x - canvasCoords.x
    //   this.y = mouse.y - canvasCoords.y
    //   this.setCornors()
    //   return
    // }

    if (mouse.press && this.topRight.hover) {
      const widhtCost = dist.x - this.width - this.x
      const heightCost = dist.y - this.y

      if (this.width + widhtCost > 50 && this.width + widhtCost < 150)
        this.width += widhtCost
      if (this.height - heightCost > 50 && this.height - heightCost < 150)
        this.height -= heightCost
      if (Math.abs(widhtCost) > Math.abs(heightCost)) this.height = this.width
      else {
        this.x += heightCost
        this.y = mouse.y - canvasCoords.y
        this.width = this.height
      }
      this.setCornors()
      return
    }

    // if (mouse.press && this.bottomLeft.hover) {
    //   this.width -= dist.x - this.x
    //   this.height += dist.y - this.height - this.y
    //   this.x = mouse.x - canvasCoords.x
    //   this.setCornors()
    //   return
    // }

    // if (mouse.press && this.bottomRight.hover) {
    //   this.width += dist.x - this.width - this.x
    //   this.height += dist.y - this.height - this.y
    //   this.setCornors()
    //   return
    // }
    // crop zone

    if (!mouse.press) {
      diffrenceCoordMouseAndCrop = {
        x: mouse.x - cropCOS.x,
        y: mouse.y - cropCOS.y,
      }
    }
    if (
      mouse.x > cropCOS.x &&
      mouse.x < cropCOS.x + this.width &&
      mouse.y > cropCOS.y &&
      mouse.y < cropCOS.y + this.height &&
      mouse.press
    ) {
      if (
        mouse.x - canvasCoords.x - diffrenceCoordMouseAndCrop.x + this.width <
          canvas.width &&
        mouse.x - canvasCoords.x - diffrenceCoordMouseAndCrop.x > 0
      )
        this.x = mouse.x - canvasCoords.x - diffrenceCoordMouseAndCrop.x
      if (
        mouse.y - canvasCoords.y - diffrenceCoordMouseAndCrop.y + this.height <
          canvas.height &&
        mouse.y - canvasCoords.y - diffrenceCoordMouseAndCrop.y > 0
      )
        this.y = mouse.y - canvasCoords.y - diffrenceCoordMouseAndCrop.y
    }

    this.setCornors()
    // cornor hover
    if (this.distance(mouse, this.topLeft) < this.cornorRadius)
      this.topLeft.hover = true
    else this.topLeft.hover = false

    if (this.distance(mouse, this.topRight) < this.cornorRadius)
      this.topRight.hover = true
    else this.topRight.hover = false

    if (this.distance(mouse, this.bottomLeft) < this.cornorRadius)
      this.bottomLeft.hover = true
    else this.bottomLeft.hover = false

    if (this.distance(mouse, this.bottomRight) < this.cornorRadius)
      this.bottomRight.hover = true
    else this.bottomRight.hover = false
  }

  setCornors() {
    // cornors
    this.topLeft.x = this.x
    this.topLeft.y = this.y
    this.topRight.x = this.x + this.width
    this.topRight.y = this.y
    this.bottomLeft.x = this.x
    this.bottomLeft.y = this.y + this.height
    this.bottomRight.x = this.x + this.width
    this.bottomRight.y = this.y + this.height
  }
}

let brush
let mycrop
export const setup = (cnv) => {
  canvas = cnv

  brush = canvas.getContext('2d')
  mycrop = new Crop(
    canvas.width / 2 - canvas.width / 4,
    canvas.height / 2 - canvas.height / 4,
    canvas.width / 2,
    canvas.height / 2,
  )
  ignite()
}

export const setMouse = (x, y) => {
  mycrop.mouse.x = x
  mycrop.mouse.y = y
}

export const setPress = (press) => {
  const mouse = { ...mycrop.mouse }
  mouse.press = press
  mycrop.mouse = mouse
}

let draws = []

let imageCoord = {
  x: 0,
  y: 0,
}

let imageSize = {
  width: 200,
  height: 200,
}
export const addImage = (files) => {
  let image = new Image()
  image.src = window.URL.createObjectURL(files[0])
  draws = []
  image.onload = () => {
    const ratioHeight = image.height / image.width
    const ratioWidth = image.width / image.height
    if (ratioHeight < ratioWidth) {
      imageSize.width = canvas.width
      imageSize.height = imageSize.width * ratioHeight
      imageCoord.y = (canvas.height - imageSize.height) / 2
    } else {
      imageSize.height = canvas.height
      imageSize.width = imageSize.height * ratioWidth
      imageCoord.x = (canvas.width - imageSize.width) / 2
    }

    draws.push(() =>
      brush.drawImage(
        image,
        imageCoord.x,
        imageCoord.y,
        imageSize.width,
        imageSize.height,
      ),
    )
  }
}

export const cropIt = () => {
  // return mycrop.
}

const draw = () => {
  brush.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < draws.length; i++) {
    draws[i]()
  }
  mycrop.draw(brush)
}

const tick = () => {
  mycrop.tick()
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}
