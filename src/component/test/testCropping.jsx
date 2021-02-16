import React, { Component } from 'react'
import { setup, addImage, setMouse, setPress } from '../util/canvas/crop'
import Button from '../util/button'
class TestCropping extends Component {
  canvasRef = React.createRef()

  componentDidMount() {
    const canvas = this.canvasRef.current
    canvas.width = 200
    canvas.height = 200
    setup(canvas)
    document.addEventListener('mousemove', this.handleMouseMovement)
    document.addEventListener('mousedown', this.handleMousePress)
    document.addEventListener('mouseup', this.handleMouseUnpress)
  }

  componentWillUnmount() {
    this.setState({ exit: true })
    document.removeEventListener('mousemove', this.handleMouseMovement)
    document.removeEventListener('mousedown', this.handleMousePress)
    document.removeEventListener('mouseup', this.handleMouseUnpress)
  }

  state = {
    mouse: {
      x: 0,
      y: 0,
      pressed: 0,
    },
    exit: false,
  }

  handleMouseMovement = ({ clientX, clientY }) => {
    setMouse(clientX, clientY)
  }

  handleMousePress = () => {
    setPress(true)
  }

  handleMouseUnpress = () => {
    setPress(false)
  }

  handleFile = (e) => {
    addImage(e.target.files)
  }

  handleCrop = () => {
    this.props.onClose()
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="dialog-background"
          style={{ background: 'white' }}
          onClick={this.props.onClose}
        ></div>
        <div className="cropping-panel">
          <div className="head">
            <h3>Change profile picture</h3>
          </div>
          <div className="body">
            <canvas className="crop" ref={this.canvasRef}></canvas>
            <input type="file" onChange={this.handleFile} />
          </div>
          <div className="foot">
            <Button classes="success" onClick={this.handleCrop}>
              Confirm
            </Button>
            <Button classes="danger" onClick={this.props.onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TestCropping
