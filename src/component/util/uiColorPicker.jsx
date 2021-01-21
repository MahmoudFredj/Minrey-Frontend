import React, { Component } from 'react'
import Button from './button'

class UiColorPicker extends Component {
  state = {
    colors: [
      '#222f3e',
      '#576574',
      '#5f27cd',
      '#feca57',
      '#ff6b6b',
      '#C4E538',
      '#1e272e',
      '#7bed9f',
      '#130f40',
      '#079992',
      '#1e3799',
      '#EA2027',
      '#f9f7f7',
      '#dbe2ef',
      '#3f72af',
      '#112d4e',
    ],
  }
  render() {
    return (
      <div>
        <Button onClick={this.props.onReturn}>⟵</Button>
        <div className="ui-color-picker">
          {this.state.colors.map((color) => (
            <div
              key={color}
              style={{ background: color }}
              onClick={() => this.props.onColorPick(color)}
            ></div>
          ))}
        </div>
      </div>
    )
  }
}

export default UiColorPicker
