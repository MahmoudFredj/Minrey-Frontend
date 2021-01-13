import React, { Component } from 'react'
const Input = ({ data, onChange, onConfirm }) => {
  const { type, name, value, placeholder, warning } = data
  return (
    <div className="input-container">
      <label>{name}:</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        autoComplete="off"
        onKeyUp={(e) => {
          if (e.keyCode === 13) onConfirm()
        }}
      />
      <span>{warning}</span>
    </div>
  )
}

export default Input
