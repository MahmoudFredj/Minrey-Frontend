import React, { Component } from 'react'
import Form from '../util/form'
import Joi from 'joi'
import { connect } from 'react-redux'
import { addComment, reply } from '../../store/entities/comment'
class CommentInput extends Component {
  getSchema = () => {
    const schema = Joi.object({
      comment: Joi.string().min(3).max(512),
    })
    return schema
  }

  handleComment = ({ comment }) => {
    if (!this.props.user) {
      alert('log in first')
      return
    }
    if (this.props.to === 'post')
      this.props.addComment({ content: comment, _id: this.props.id })
    else this.props.reply({ content: comment, _id: this.props.id })

    this.props.onCancel()
  }

  render() {
    return (
      <Form
        schema={this.getSchema}
        name="What you think !"
        onConfirm={this.handleComment}
        onCancel={this.props.onCancel}
      />
    )
  }
}

const mapState = (state) => ({
  loading: state.comment.loading,
  comments: state.comment.list,
  warning: state.comment.error,
  user: state.user.userInfo,
})

const mapDispatch = (dispatch) => ({
  addComment: (comment) => dispatch(addComment(comment)),
  reply: (comment) => dispatch(reply(comment)),
})

export default connect(mapState, mapDispatch)(CommentInput)
