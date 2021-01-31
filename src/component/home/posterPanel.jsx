import React, { Component } from 'react'
import Button from '../util/button'
import { connect } from 'react-redux'
import { likePost } from '../../store/entities/post'

class PosterPanel extends Component {
  state = {
    liked: false,
  }

  componentDidMount() {
    if (this.props.user)
      this.props.value.likes.map((like) => {
        if (like === this.props.user._id) this.setState({ liked: true })
      })
  }

  arrayBufferToBase64(buffer) {
    var binary = ''
    var bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    return window.btoa(binary)
  }

  handleLike = () => {
    if (!this.props.user) {
      alert('log in first')
      return
    }
    this.setState({ liked: !this.state.liked })
    this.props.likePost({ _id: this.props.value._id })
  }
  render() {
    return (
      <div className="poster-panel">
        <h3
          className="title"
          onClick={() => this.props.onClick(this.props.value)}
        >
          {this.props.value && this.props.value.title}
        </h3>
        <div className="content">
          {this.props.value && (
            <img
              onClick={() => this.props.onClick(this.props.value)}
              src={`data:image/jpeg;base64,${this.arrayBufferToBase64(
                this.props.value.image.data.data,
              )}`}
              alt="poster"
            />
          )}
        </div>
        <div className="footer">
          <span
            className={` ${this.state.liked ? 'liked' : 'unliked'}`}
            onClick={this.handleLike}
          >
            ❤
          </span>
          <span>{this.props.value.likes.length}</span>
          <Button>copy link</Button>

          {this.props.user && this.props.user.isAdmin && (
            <Button>Delete</Button>
          )}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userInfo,
})

const mapDispatch = (dispatch) => ({
  likePost: (id) => dispatch(likePost(id)),
})

export default connect(mapState, mapDispatch)(PosterPanel)
