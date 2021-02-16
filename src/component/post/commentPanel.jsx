import React, { Component } from 'react'
import Button from '../util/button'
import { connect } from 'react-redux'
import CommentInput from './commentInput'
import {
  loadReplies,
  likeComment,
  deleteComment,
} from '../../store/entities/comment'
import ReplayPanel from './replyPanel'
import { dialogStart } from '../util/dialog'
class CommentPanel extends Component {
  state = {
    reply: false,
    loaded: false,
    liked: false,
  }

  componentDidMount() {
    if (!this.props.user) return
    this.props.comment.likes.map((like) => {
      if (like === this.props.user._id) this.setState({ liked: true })
    })
  }

  handleLoadReplies = async () => {
    await this.props.loadReplies(this.props.comment._id)
    this.setState({ loaded: true })
  }

  handleReply = () => {
    if (!this.props.user) {
      alert('log in first')
      return
    }
    this.setState({ reply: !this.state.reply })
  }

  handleLike = () => {
    if (!this.props.user) {
      alert('log in first')
      return
    }
    this.setState({ liked: !this.state.liked })
    this.props.likeComment({ _id: this.props.comment._id })
  }
  handleDelete = () => {
    const comment = this.props.comment
    dialogStart({
      head: 'confirmation dialg',
      body: 'are you sure you want to delete this comment?',
      confirm: () => {
        this.props.deleteComment({ _id: comment._id })
      },
    })
  }
  render() {
    const comment = this.props.comment
    return (
      <div className="comment-panel">
        <div className="head">
          <label>{comment.user.name}</label>
        </div>
        <div className="body">
          <article>{comment.content}</article>
        </div>
        <div className="foot">
          <span
            className={this.state.liked ? 'liked' : 'unliked'}
            onClick={this.handleLike}
          >
            ❤
          </span>
          <span>{comment.likes.length}</span>
          <span className="success sm-btn" onClick={this.handleReply}>
            replay
          </span>
          {this.props.user && comment.user._id === this.props.user._id && (
            <span
              className="update-comment  sm-btn"
              onClick={this.handleDelete}
            >
              delete
            </span>
          )}
        </div>
        <div className="comments">
          {this.state.reply && (
            <CommentInput
              key={comment._id}
              id={comment._id}
              to="comment"
              onCancel={() => this.setState({ reply: false })}
            />
          )}
          {comment.comments.length > 0 && !this.state.loaded && (
            <Button onClick={this.handleLoadReplies}>Load Replies</Button>
          )}
          {this.state.loaded &&
            this.props.comment.comments.map((reply) => (
              <ReplayPanel
                key={reply._id}
                reply={reply}
                motherId={this.props.comment._id}
              />
            ))}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userInfo,
})
const mapDispatch = (dispatch) => ({
  loadReplies: (id) => dispatch(loadReplies(id)),
  likeComment: (id) => dispatch(likeComment(id)),
  deleteComment: (id) => dispatch(deleteComment(id)),
})
export default connect(mapState, mapDispatch)(CommentPanel)
