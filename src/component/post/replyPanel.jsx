import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likeReply } from '../../store/entities/comment'
class ReplayPanel extends Component {
  state = {
    liked: false,
  }
  componentDidMount() {
    if (!this.props.user) return
    this.props.reply.likes.map((like) => {
      if (like === this.props.user._id) this.setState({ liked: true })
    })
  }

  handleLike = () => {
    if (!this.props.user) {
      alert('log in first')
      return
    }
    this.setState({ liked: !this.state.liked })
    this.props.likeReplay({
      _id: this.props.reply._id,
      mother: this.props.motherId,
    })
  }
  render() {
    const comment = this.props.reply
    return (
      <div className="comment-panel reply">
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
          <span>{this.props.reply.likes.length}</span>

          {/* <span
            className="success"
            onClick={() => this.setState({ reply: !this.state.reply })}
          >
            replay
          </span> */}

          {this.props.user && comment.user._id === this.props.user._id && (
            <span className="update-comment sm-btn">update</span>
          )}
        </div>
        <div className="comments"></div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userInfo,
})

const mapDispatch = (dispatch) => ({
  likeReplay: (data) => dispatch(likeReply(data)),
})

export default connect(mapState, mapDispatch)(ReplayPanel)
