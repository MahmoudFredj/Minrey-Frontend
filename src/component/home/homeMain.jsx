import React, { Component } from 'react'
import PostPanel from './posterPanel'
import { connect } from 'react-redux'
import {
  loadPost,
  clearList,
  loadPostWithCategory,
} from '../../store/entities/post'
import LoadingPanel from '../util/loadingPanel'
class HomeMain extends Component {
  state = {
    tick: false,
    pageNumber: 1,
    pageSize: 5,
  }
  componentDidMount() {
    const pageNumber = this.state.pageNumber
    const pageSize = this.state.pageSize
    if (this.props.match.params.id)
      this.props.loadPostWithCategory(
        this.props.match.params.id,
        pageNumber,
        pageSize,
      )
    else this.props.loadPost(pageNumber, pageSize)
  }
  componentWillUnmount() {
    this.props.clearList()
  }
  handleScroll = async (e) => {
    const leftOverScroll =
      e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight
    if (leftOverScroll < 500 && !this.state.tick) {
      const pageNumber = this.state.pageNumber + 1
      this.setState({ tick: true, pageNumber })
      if (!this.props.full) {
        if (this.props.match.params.id)
          await this.props.loadPostWithCategory(
            this.props.match.params.id,
            pageNumber,
            this.state.pageSize,
          )
        else await this.props.loadPost(pageNumber, this.state.pageSize)
      }
      this.setState({ tick: false })
    }
  }
  handleRedirect = ({ _id }) => {
    this.props.history.push(`/poster/${_id}`)
  }
  render() {
    return (
      <div className="main-content-posters" onScroll={this.handleScroll}>
        {this.props.posts.map((post) => (
          <PostPanel
            key={post._id}
            value={post}
            onClick={this.handleRedirect}
          />
        ))}
        {this.props.loading && <LoadingPanel />}
      </div>
    )
  }
}
const mapState = (state) => ({
  posts: state.post.list,
  loading: state.post.loading,
  full: state.post.full,
})

const mapDispatch = (dispatch) => ({
  loadPost: (pageNumber, pageSize) => dispatch(loadPost(pageNumber, pageSize)),
  loadPostWithCategory: (id, pageNumber, pageSize) =>
    dispatch(loadPostWithCategory(id, pageNumber, pageSize)),
  clearList: () => dispatch(clearList()),
})
export default connect(mapState, mapDispatch)(HomeMain)
