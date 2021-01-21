import React, { Component } from 'react'
import Form from '../util/form'
import Joi from 'joi'
import Button from '../util/button'
import { connect } from 'react-redux'
import { register } from '../../store/entities/user'
import LoadingScreen from '../util/loadingScreen'

class Register extends Component {
  getSchema = () => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(5).max(150).required(),
      firstName: Joi.string().min(3).max(50).required(),
      lastName: Joi.string().min(3).max(50).required(),
      birthDate: Joi.date(),
    })
    return schema
  }

  handleRegister = async ({
    email,
    password,
    firstName,
    lastName,
    birthDate,
  }) => {
    const registerform = {
      email,
      password,
      name: `${firstName} ${lastName}`,
      birthDate,
    }
    await this.props.register(registerform)
    if (!this.props.warning) this.props.history.push('/')
  }
  render() {
    return (
      <div className="register-page">
        {this.props.loading && <LoadingScreen />}
        <Button
          onClick={() => this.props.history.goBack()}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          ⟵
        </Button>
        <div className="triangle-topleft-1"></div>
        <div className="triangle-topleft-2"></div>
        <div className="triangle-topleft-3"></div>
        <Form
          schema={this.getSchema}
          name="Register"
          warning={this.props.warning}
          onConfirm={this.handleRegister}
        ></Form>
      </div>
    )
  }
}

const mapState = (state) => ({
  loading: state.user.loading,
  warning: state.user.error,
})
const mapDispatch = (dispatch) => ({
  register: (form) => dispatch(register(form)),
})
export default connect(mapState, mapDispatch)(Register)
