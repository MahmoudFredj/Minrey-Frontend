import React, { Component } from 'react'
const TextArea = ({ data, onChange }) => {
  const { type, name, value, placeholder, warning } = data
  return (
    <div className="input-container">
      <label>{name}:</label>
      <textarea
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        autoComplete="off"
      ></textarea>
      <span>{warning}</span>
    </div>
  )
}

export default TextArea
