import React, { Component } from 'react'
import { fire } from './canvas/drawing'
class LoadingScreen extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      fire({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })
    }, 50)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return <div className="dialog-background" style={{ zIndex: '24' }}></div>
  }
}

export default LoadingScreen
