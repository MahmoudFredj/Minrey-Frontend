import React, { Component } from 'react'
import Joi from 'joi'
import Form from '../util/form'
import { connect } from 'react-redux'
import { updateProfile } from '../../store/entities/user'
import LoadingScreen from '../util/loadingScreen'
class Profile extends Component {
  getSchema = () => {
    return Joi.object({
      name: Joi.string().min(3).max(255).required(),
      birthDate: Joi.date().required(),
    })
  }

  handleUpdate = (form) => {
    const newBirthdate = new Date(form.birthDate)
    const oldBirthdate = new Date(this.props.user.birthDate)
    if (
      newBirthdate.getTime() === oldBirthdate.getTime() &&
      form.name === this.props.user.name
    )
      return

    this.props.updateProfile(form)
  }

  render() {
    let birthDate
    if (this.props.user && this.props.user.email) {
      birthDate = new Date(this.props.user.birthDate)
    }

    return (
      <div>
        {this.props.loading && <LoadingScreen />}
        <h1>Profile</h1>
        {this.props.user && this.props.user.email && (
          <Form
            name="Profile"
            schema={this.getSchema}
            onConfirm={this.handleUpdate}
            setters={[
              { name: 'name', value: this.props.user.name },
              {
                name: 'birthDate',
                value: `${birthDate.getFullYear()}-${(
                  '0' +
                  (birthDate.getMonth() + 1)
                ).slice(-2)}-${('0' + birthDate.getDate()).slice(-2)}`,
              },
            ]}
            noResetAtConfirm={true}
            warning={this.props.error}
          />
        )}
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
  updateProfile: (form) => dispatch(updateProfile(form)),
})

export default connect(mapState, mapDispatch)(Profile)
