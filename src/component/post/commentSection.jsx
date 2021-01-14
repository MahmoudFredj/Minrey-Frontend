import React, { Component } from 'react'
import Button from '../util/button'
import CommentInput from './commentInput'
import { loadComment, resetCommentSection } from '../../store/entities/comment'
import { connect } from 'react-redux'
import CommentPanel from './commentPanel'
class CommentSection extends Component {
  state = {
    loaded: false,
  }
  handleLoadingComment = async () => {
    await this.props.loadComment(this.props.post)
    this.setState({ loaded: true })
  }
  componentWillUnmount() {
    this.props.resetCommentSection()
  }
  render() {
    return (
      <div className="comment-section">
        {this.state.loaded && <CommentInput id={this.props.post} to="post" />}
        {!this.state.loaded && (
          <React.Fragment>
            <Button
              style={{ margin: '10px' }}
              onClick={this.handleLoadingComment}
            >
              Load comments ...
            </Button>
          </React.Fragment>
        )}

        {this.props.comments.map((comment) => (
          <CommentPanel key={comment._id} comment={comment} />
        ))}
      </div>
    )
  }
}

const mapState = (state) => ({
  comments: state.comment.list,
})

const mapDispatch = (dispatch) => ({
  loadComment: (id) => dispatch(loadComment(id)),
  resetCommentSection: () => dispatch(resetCommentSection()),
})

export default connect(mapState, mapDispatch)(CommentSection)
