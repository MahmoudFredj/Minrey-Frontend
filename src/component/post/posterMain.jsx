import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadOnePost } from '../../store/entities/post'
import PosterPanel from '../home/posterPanel'
import Button from '../util/button'
import CommentSection from './commentSection'
class PosterMain extends Component {
  state = {
    loading: true,
  }
  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.loadPost(id)
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="poster-main">
        <Button onClick={() => this.props.history.push('/')}>⟵</Button>
        <div className="poster-section">
          {!this.state.loading && (
            <PosterPanel value={this.props.post} onClick={() => {}} />
          )}
        </div>
        <CommentSection post={this.props.match.params.id} />
      </div>
    )
  }
}
const mapState = (state) => ({
  post: state.post.one,
})

const mapDispatch = (dispatch) => ({
  loadPost: (id) => dispatch(loadOnePost(id)),
})
export default connect(mapState, mapDispatch)(PosterMain)
