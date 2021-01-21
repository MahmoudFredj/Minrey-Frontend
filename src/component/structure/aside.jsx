import React, { Component } from 'react'
import UiColorPicker from '../util/uiColorPicker'
import { getColors, setColorSection } from '../util/library/colorManagement'
class Aside extends Component {
  state = {
    pick: false,
    section: null,
  }

  handleSectionPick = (section) => {
    this.setState({ section: section, pick: true })
  }

  handleColorPick = (color) => {
    setColorSection(this.state.section, color)
    this.setState({ section: null, pick: false })
  }
  render() {
    return (
      <div className="aside-user-ui-management">
        <h3>UI/UX</h3>
        {this.state.pick ? (
          <UiColorPicker
            onReturn={() => this.setState({ section: null, pick: false })}
            onColorPick={this.handleColorPick}
          />
        ) : (
          <div className="color-picker-menu">
            <label onClick={() => this.handleSectionPick('primary')}>
              primary
            </label>
            <label onClick={() => this.handleSectionPick('secondary')}>
              secondary
            </label>
            <label onClick={() => this.handleSectionPick('text')}>text</label>
            <label onClick={() => this.handleSectionPick('prefix')}>
              prefix
            </label>
            <label onClick={() => this.handleSectionPick('suffix')}>
              suffix
            </label>
            <label onClick={() => this.handleSectionPick('exotic')}>
              exotic
            </label>
            <label onClick={() => this.handleSectionPick('rey')}>rey</label>
          </div>
        )}
      </div>
    )
  }
}

export default Aside
