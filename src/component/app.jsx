import React, { Component } from 'react'
import TransitionScreen from './util/transitionScreen'
import { setup, ignite, fire, liftOff } from './util/canvas/drawing'
import HomePage from './home/homePage'
import Login from './auth/login'
import Register from './auth/register'
import Logout from './auth/logout'
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom'
import { connect } from 'react-redux'

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
  }
  render() {
    return (
      <React.Fragment>
        <canvas></canvas>
        {this.props.ui.loadingScreen && (
          <TransitionScreen classes={this.props.ui.classes} />
        )}
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}
const mapState = (state) => ({ ui: state.ui })
const mapDispatch = (dispatch) => ({ dispatch })
export default connect(mapState, mapDispatch)(App)
