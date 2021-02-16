import React, { Component } from 'react'
import userIcon from '../../assets/userIconLarge.png'
import { connect } from 'react-redux'
import { loadUser, loadUserById } from '../../store/entities/user'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import Account from './account'
import Password from './password'
import Profile from './profile'
import Button from '../util/button'
import TestCropping from '../test/testCropping.jsx'

class UserManagement extends Component {
  state = {
    croppingMode: false,
  }
  async componentDidMount() {
    await this.props.loadUser()
    await this.props.loadUserById(this.props.user._id)
    console.log(this.props.user)
  }
  handlePictureChange = (img) => {
    console.log(img)
  }
  render() {
    return (
      <div className="user-management-wrapper">
        {this.state.croppingMode && (
          <TestCropping
            onClose={() => {
              this.setState({ croppingMode: false })
            }}
            onConfirm={this.handlePictureChange}
          />
        )}
        <BrowserRouter>
          <div className="aside">
            <Button onClick={() => this.props.history.push('/')}>⟵</Button>
            <div className="head">
              <div
                className="user-img-wrapper"
                onClick={() => this.setState({ croppingMode: true })}
              >
                <img src={userIcon} alt="User Image" />
                <span>change pic</span>
              </div>
              <label>{this.props.user && this.props.user.email}</label>
            </div>
            <hr />
            <div className="body">
              <Link to="/userManagement">Account</Link>
              <Link to="/userManagement/Password">Password</Link>
              <Link to="/userManagement/Profile">Profile</Link>
            </div>
          </div>
          <div className="main">
            <Switch>
              <Route exact path="/userManagement" component={Account} />
              <Route path="/userManagement/Password" component={Password} />
              <Route path="/userManagement/Profile" component={Profile} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
const mapState = (state) => ({
  user: state.user.userInfo,
})

const mapDispatch = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
  loadUserById: (id) => dispatch(loadUserById(id)),
})
export default connect(mapState, mapDispatch)(UserManagement)
