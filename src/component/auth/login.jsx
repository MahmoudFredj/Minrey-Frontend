import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoading } from '../../store/entities/ui'
import Button from '../util/button'
import Form from '../util/form'
import Joi from 'joi'
import { Link } from 'react-router-dom'
import Minion2 from '../../assets/minion2'
import { login } from '../../store/entities/user'
import LoadingScreen from '../util/loadingScreen'

class Login extends Component {
  getLoginSchema = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    return schema
  }

  handleLogin = async (form) => {
    await this.props.login(form)
    if (!this.props.warning) this.props.history.push('/')
  }
  render() {
    return (
      <div className="login-page">
        {this.props.loading && <LoadingScreen />}
        <div className="decore-side" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '60%',
              left: '40%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <Minion2 />
          </div>
        </div>
        <div className="form-side">
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
            schema={this.getLoginSchema}
            name="Login"
            onConfirm={this.handleLogin}
            warning={this.props.warning}
          >
            <Link to="/register">Register</Link>
          </Form>
        </div>
      </div>
    )
  }
}
const mapState = (state) => ({
  ui: state.ui,
  warning: state.user.error,
  loading: state.user.loading,
})
const mapDispatch = (dispatch) => ({
  setLoading: (value) => dispatch(setLoading(value)),
  setLoadingClass: (value) => dispatch(setLoading(value)),
  login: (form) => dispatch(login(form)),
})
export default connect(mapState, mapDispatch)(Login)
