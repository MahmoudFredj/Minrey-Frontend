import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import { connect } from 'react-redux'
import { setLoading } from '../../store/entities/ui'
import { withRouter } from 'react-router'
import Button from '../util/button'
import UploadButton from '../util/uploadButton'
import UploadPosterPanel from '../home/uploadPosterPanel'
import { logout, loadUser } from '../../store/entities/user'
import { switchPhoneMenu } from '../../store/entities/ui'
import LoadingScreen from '../util/loadingScreen'
class Head extends Component {
  state = {
    logged: true,
    displayFormPanel: false,
  }
  componentDidMount() {
    this.props.loadUser()
  }
  handleRedirect = () => {
    this.props.history.push('/login')
  }
  render() {
    return (
      <React.Fragment>
        {this.state.displayFormPanel && (
          <UploadPosterPanel
            onCancel={() => this.setState({ displayFormPanel: false })}
          />
        )}
        <header className="app-header">
          <div className="app-logo">
            <img src={logo} alt="logo" />
            <label
              onClick={() =>
                this.props.switchPhoneMenu(!this.props.ui.phoneMenu)
              }
            >
              ☰
            </label>
          </div>
          <h1>minray</h1>
          <aside>
            {this.props.user ? (
              <UploadButton
                onClick={() => {
                  this.setState({ displayFormPanel: true })
                }}
              />
            ) : (
              <Button onClick={this.handleRedirect}>Join us !</Button>
            )}
          </aside>
        </header>
      </React.Fragment>
    )
  }
}
const mapState = (state) => ({
  user: state.user.userInfo,
  loading: state.post.loading,
  warning: state.post.error,
  ui: state.ui,
})
const mapDispatch = (dispatch) => ({
  setLoading: (value) => dispatch(setLoading(value)),
  logout: () => dispatch(logout()),
  loadUser: () => dispatch(loadUser()),
  switchPhoneMenu: (value) => dispatch(switchPhoneMenu(value)),
})
export default connect(mapState, mapDispatch)(withRouter(Head))
