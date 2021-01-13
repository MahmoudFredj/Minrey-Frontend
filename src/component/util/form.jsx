import React, { Component } from 'react'
import Button from './button'
import Input from './input'
import TextArea from './textArea'
class Form extends Component {
  state = {
    inputs: [],
  }
  componentDidMount() {
    let inputs = []
    const schema = this.props.schema()

    for (const key of schema._ids._byKey.entries()) {
      let area = false
      for (const ops of key[1].schema._singleRules.entries()) {
        if (ops[0] === 'max') {
          if (ops[1].args.limit > 400) area = true
        }
      }

      inputs.push({
        name: key[0],
        type: area ? 'text-area' : 'text',
        value: '',
        warning: null,
      })
    }

    this.schema = schema
    this.setState({ inputs })
  }
  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    const inputs = this.state.inputs
    inputs.map((input) => (input.name === name ? (input.value = value) : input))
    this.setState({ inputs })
  }

  handleConfirm = () => {
    let inputs = [...this.state.inputs]
    //reset errors
    inputs.map((input) => {
      input.warning = null
    })

    let stringForm = '{'
    for (let i = 0; i < inputs.length; i++) {
      stringForm += `"${inputs[i].name}":"${inputs[i].value.trim()}"`
      if (i + 1 < inputs.length) stringForm += ','
    }
    stringForm += '}'
    const jsonForm = JSON.parse(stringForm)

    const { error } = this.schema.validate(jsonForm)
    if (!error) {
      //reseting inputs array
      inputs.map((input) => {
        input.value = ''
      })

      this.setState({ inputs })
      return this.props.onConfirm(jsonForm)
    }
    const message = error.details[0].message
    const name = error.details[0].path

    inputs.map((input) => {
      if (input.name == name) input.warning = message
    })

    this.setState({ inputs })
  }
  render() {
    return (
      <div className="form-wrapper">
        <fieldset>
          <legend>{this.props.name}</legend>
          {this.props.warning && (
            <label className="form-warning">{this.props.warning}</label>
          )}
          {this.state.inputs.map((input) => {
            switch (input.type) {
              case 'text':
                return (
                  <Input
                    key={input.name}
                    data={{
                      name: input.name,
                      placeholder: input.name,
                      type:
                        input.name == 'password'
                          ? 'password'
                          : input.name === 'birthDate'
                          ? 'date'
                          : 'text',
                      value: input.value,
                      warning: input.warning,
                    }}
                    onChange={this.handleChange}
                    onConfirm={this.handleConfirm}
                  />
                )
                break
              case 'text-area':
                return (
                  <TextArea
                    key={input.name}
                    data={{
                      name: input.name,
                      placeholder: input.name,
                      type: input.name == 'password' ? 'password' : input.type,
                      value: input.value,
                      warning: input.warning,
                    }}
                    onChange={this.handleChange}
                  />
                )
              default:
                break
            }
          })}
          {this.props.children}
          <Button
            classes="success"
            style={{ float: 'right' }}
            onClick={this.handleConfirm}
          >
            Confirm
          </Button>
          <Button
            classes="danger"
            style={{ float: 'right' }}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </fieldset>
      </div>
    )
  }
}

export default Form
