import React, { Component } from 'react'
import Button from './button'

let confirm = () => {}

let start
export const dialogStart = (config) => {
  confirm = config.confirm
  start(config.head, config.body)
}
class Dialog extends Component {
  state = {
    display: false,
    head: 'dialog',
    body: 'are you sure',
  }
  componentDidMount() {
    start = (head, body) => {
      if (head) this.setState({ head })
      if (body) this.setState({ body })
      this.setState({ head, body, display: true })
    }
  }
  render() {
    if (!this.state.display) return <div></div>
    return (
      <React.Fragment>
        <div
          className="dialog-background"
          onClick={() => this.setState({ display: false })}
        ></div>
        <div className="dialog">
          <div className="head">
            {this.state.head}
            <span
              className="close"
              onClick={() => this.setState({ display: false })}
            >
              ✖
            </span>
          </div>
          <div className="body">
            <article>{this.state.body}</article>
          </div>
          <div className="foot">
            <Button
              classes="danger"
              onClick={() => this.setState({ display: false })}
            >
              cancel
            </Button>
            <Button
              classes="success"
              onClick={() => {
                confirm()
                this.setState({ display: false })
              }}
            >
              confirm
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Dialog
