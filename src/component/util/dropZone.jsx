import react from 'react'
import React, { Component } from 'react'
import { arrayBufferToBase64 } from './library/rayUtil'
class DropZone extends Component {
  state = {
    dropActivation: false,
    source: null,
  }
  handleFile = (e) => {
    var filesArr = Array.prototype.slice.call(e.target.files)
    this.setState({
      source: window.URL.createObjectURL(filesArr[0]),
      dropActivation: false,
    })
    this.props.onChange(filesArr[0])
  }
  render() {
    return (
      <div
        className="drop-zone"
        style={{
          background: this.state.dropActivation ? 'lightgreen' : 'transparent',
        }}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div>
          <label>Drop here.</label>
          <label> 🢃</label>
        </div>
        {this.state.source && (
          <img
            src={this.state.source}
            alt="works"
            className="content-drop-zone"
          />
        )}
        <input type="file" name={this.props.name} onChange={this.handleFile} />
      </div>
    )
  }

  handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ dropActivation: true })
  }
  handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ dropActivation: false })
  }
  handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    var filesArr = Array.prototype.slice.call(files)
    this.setState({
      source: window.URL.createObjectURL(filesArr[0]),
      dropActivation: false,
    })
    this.props.onChange(filesArr[0])
  }
}

export default DropZone
