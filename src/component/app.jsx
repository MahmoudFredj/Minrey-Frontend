import React, { Component } from 'react'
import TransitionScreen from './util/transitionScreen'
import { setup, ignite, fire, liftOff, setMouse } from './util/canvas/drawing'
import HomePage from './home/homePage'
import Login from './auth/login'
import Register from './auth/register'
import Logout from './auth/logout'
import UserManagement from './user/userManagement'
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { load } from './util/library/colorManagement'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Dialog from './util/dialog'

class App extends Component {
  componentDidMount() {
    let canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    setup(canvas.getContext('2d'))
    ignite()
    document.addEventListener('mouseup', (e) => {
      const pos = { x: e.clientX, y: e.clientY }
      fire(pos)
    })
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
    load()
  }
  render() {
    return (
      <React.Fragment>
        <canvas></canvas>
        <Dialog />
        {this.props.ui.loadingScreen && (
          <TransitionScreen classes={this.props.ui.classes} />
        )}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/userManagement"
              render={(props) => {
                if (!this.props.user) return <Redirect to="/login" />
                return <UserManagement {...props} />
              }}
            />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}
const mapState = (state) => ({ ui: state.ui, user: state.user.userInfo })
const mapDispatch = (dispatch) => ({ dispatch })
export default connect(mapState, mapDispatch)(App)
