import React, { Component } from 'react'
import Form from '../util/form'
import Joi from 'joi'
import { connect } from 'react-redux'
import { updatePassword } from '../../store/entities/user'
import LoadingScreen from '../util/loadingScreen'
class Passowrd extends Component {
  getSchema = () => {
    return Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    })
  }

  handleUpdate = (form) => {
    this.props.updatePassword(form)
  }

  render() {
    return (
      <div>
        {this.props.loading && <LoadingScreen />}
        <h1>Password</h1>
        <Form
          name="password"
          schema={this.getSchema}
          onConfirm={this.handleUpdate}
          warning={this.props.error}
        ></Form>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userInfo,
  error: state.user.error,
  loading: state.user.loading,
})
const mapDispatch = (dispatch) => ({
  updatePassword: (form) => dispatch(updatePassword(form)),
})
export default connect(mapState, mapDispatch)(Passowrd)
