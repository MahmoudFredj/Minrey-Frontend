import React, { Component } from 'react'
import Foot from '../structure/foot'
import Head from '../structure/head'
import Menu from '../structure/menu'
import { setLoading, setLoadingClass } from '../../store/entities/ui'
import { connect } from 'react-redux'
import LoadingScreen from '../util/loadingScreen'
import HomeMain from './homeMain'
import PosterMain from '../post/posterMain'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import posterMain from '../post/posterMain'
class HomePage extends Component {
  static history
  componentDidMount() {
    this.props.history.listen(() => {
      this.props.setLoading(true)
      setTimeout(() => {
        this.props.setLoadingClass('close-swipe')
        setTimeout(() => {
          this.props.setLoading(false)
          this.props.setLoadingClass('')
        }, 600)
      }, 1000)
    })
  }

  render() {
    return (
      <div className="main-app-wrapper">
        <Head />
        <main>
          <BrowserRouter>
            <Menu classes={` ${this.props.ui.phoneMenu && 'phone-ui-menu'}`} />
            <Switch>
              <Route path="/rey/:id" component={PosterMain} />
              <Route path="/category/:id" component={HomeMain} />
              <Route path="/" component={HomeMain} />
              <div className="hot-post-aside"></div>
            </Switch>
          </BrowserRouter>
        </main>

        <Foot />
      </div>
    )
  }
}
const mapState = (state) => ({
  ui: state.ui,
})

const mapDispatch = (dispatch) => ({
  setLoading: (value) => dispatch(setLoading(value)),
  setLoadingClass: (value) => dispatch(setLoadingClass(value)),
})
export default connect(mapState, mapDispatch)(HomePage)
