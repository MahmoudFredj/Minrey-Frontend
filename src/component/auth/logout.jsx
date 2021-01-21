import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/entities/user'
class Logout extends Component {
  state = {}
  componentDidMount() {
    console.log('logging out')
    this.props.logout()
    this.props.history.goBack()
  }
  render() {
    return <div></div>
  }
}

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(null, mapDispatch)(Logout)
