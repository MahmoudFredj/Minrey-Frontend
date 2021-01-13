import React, { Component } from 'react'
const Button = (props) => {
  return (
    <button
      className={`${props.classes} btn`}
      style={props.style}
      onClick={props.onClick}
    >
      <span className="top"></span>
      <span className="bottom"></span>
      <span className="left"></span>
      <span className="right"></span>
      {props.children}
    </button>
  )
}

export default Button
