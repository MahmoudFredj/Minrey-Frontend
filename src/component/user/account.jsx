import React, { Component } from 'react'
import Form from '../util/form'
import Joi from 'joi'
import { connect } from 'react-redux'
import { updateAccount } from '../../store/entities/user'
import LoadingScreen from '../util/loadingScreen'
class Account extends Component {
  state = {
    notifyMe: false,
  }
  getSchema = () => {
    return Joi.object({
      email: Joi.string().email({ tlds: false }).required().label('hello'),
    })
  }

  handleUpdate = async (value) => {
    const form = {
      email: value.email,
      notifyMe: this.state.notifyMe,
    }

    if (form.email === this.props.user.email) return
    this.props.updateAccount(form)
  }
  render() {
    return (
      <div>
        {this.props.loading && <LoadingScreen />}
        <h1>Account</h1>
        {this.props.user && this.props.user.email && (
          <Form
            schema={this.getSchema}
            name="account"
            setters={[{ name: 'email', value: this.props.user.email }]}
            onConfirm={this.handleUpdate}
            noResetAtConfirm={true}
            warning={this.props.error}
          >
            <hr style={{ margin: '10px', opacity: '0' }} />
            <div
              className="upload-poster-panel-category"
              style={{ display: 'inline' }}
            >
              Notify me:
              <label
                className={` ${this.state.notifyMe && 'active'}`}
                onClick={() => this.setState({ notifyMe: true })}
              >
                on
              </label>
              <label
                className={` ${!this.state.notifyMe && 'active'}`}
                onClick={() => this.setState({ notifyMe: false })}
              >
                off
              </label>
            </div>
            <hr style={{ margin: '10px', opacity: '0' }} />
          </Form>
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
  updateAccount: (form) => dispatch(updateAccount(form)),
})
export default connect(mapState, mapDispatch)(Account)
