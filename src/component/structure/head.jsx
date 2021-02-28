import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import { connect } from 'react-redux'
import { setLoading } from '../../store/entities/ui'
import { withRouter } from 'react-router'
import Button from '../util/button'
import UploadButton from '../util/uploadButton'
import UploadPosterPanel from '../home/uploadPosterPanel'
import { arrayBufferToBase64 } from '../util/library/rayUtil'
import { logout, loadUser, loadUserById } from '../../store/entities/user'
import { switchPhoneMenu } from '../../store/entities/ui'
import LoadingScreen from '../util/loadingScreen'
import userIcon from '../../assets/userIcon.png'
class Head extends Component {
  state = {
    logged: true,
    displayFormPanel: false,
  }
  async componentDidMount() {
    await this.props.loadUser()
    await this.props.loadUserById(this.props.user._id)
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
          <h1>minrey</h1>
          <div className="head-user-menu">
            {this.props.user && (
              <React.Fragment>
                <label>
                  {!this.props.user.image ? (
                    <img src={userIcon} alt="user" />
                  ) : (
                    <img
                      src={`data:image/jpeg;base64,${arrayBufferToBase64(
                        this.props.user.image.data.data,
                      )}`}
                      alt="user"
                    />
                  )}
                </label>
                <div className="head-user-menu-body">
                  <label
                    onClick={() => this.props.history.push('/userManagement')}
                  >
                    User Management
                  </label>
                  <label onClick={() => this.props.logout()}>Logout</label>
                </div>
              </React.Fragment>
            )}
          </div>
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
  loadUserById: (id) => dispatch(loadUserById(id)),
})
export default connect(mapState, mapDispatch)(withRouter(Head))
