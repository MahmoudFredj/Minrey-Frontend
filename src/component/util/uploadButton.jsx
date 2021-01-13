import React, { Component } from 'react'
import Rocket from '../../assets/rocket'
import { liftOff } from './canvas/drawing'
const UploadButton = ({ onClick }) => {
  let ref = React.createRef()
  let interval
  function handleEnter() {
    const rect = ref.current.getBoundingClientRect()
    interval = setInterval(() => {
      liftOff({
        x: randomIntFromInterval(rect.left + 20, rect.left + rect.width - 20),
        y: 70,
      })
    }, 200)
  }
  function handleLeave() {
    clearInterval(interval)
  }
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  return (
    <div
      ref={ref}
      className="upload-button"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => {
        onClick()
        handleLeave()
      }}
    >
      <Rocket />
    </div>
  )
}

export default UploadButton
