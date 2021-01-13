import React, { Component } from 'react'
import Input from '../util/input'
import Button from '../util/button'
import DropZone from '../util/dropZone'
import Joi from 'joi'
import { connect } from 'react-redux'

import { addPost } from '../../store/entities/post'
class uploadPosterPanel extends Component {
  state = {
    title: '',
    image: null,
    next: false,
    pickedCategory: null,
    warning: null,
  }
  handleChange = (e) => {
    let state = { ...this.state }
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleImage = (file) => {
    let state = { ...this.state }
    //reseting warning
    this.setState({ warning: null })
    console.log(file)
    if (file.size > 4000000) {
      this.setState({ warning: 'file size too BIG!! (max is 4mo)' })
      return
    }
    if (
      file.type !== 'image/png' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg'
    ) {
      this.setState({ warning: 'file type is not png or jpg' })
      return
    }
    state.image = file
    this.setState(state)
  }

  handleUpload = async () => {
    const form = new FormData()
    const state = { ...this.state }
    //confirmation

    //creating schema for joi
    const schema = Joi.object({
      title: Joi.string().min(3).max(255).required(),
    })
    //validating title
    const { error } = schema.validate({ title: state.title })
    if (error) {
      this.setState({ warning: error.details[0].message, next: false })
      return
    }
    //validate image
    if (!state.image) {
      this.setState({ warning: 'please pick an image', next: false })
      return
    }
    //validate category
    if (!state.pickedCategory) {
      this.setState({ warning: 'please pick a category', next: false })
      return
    }

    form.append('title', state.title)
    form.append('image', state.image, state.image.name)
    form.append('category', state.pickedCategory)
    await this.props.addPost(form)
    this.props.onCancel()
  }
  handleNext = () => {}
  render() {
    return (
      <React.Fragment>
        <div className="dialog-background" onClick={this.props.onCancel}></div>
        <div className="upload-poster-panel">
          <div className="head">
            <h2>What you got !</h2>
            <span className="close" onClick={this.props.onCancel}>
              ✖
            </span>
          </div>
          <div className="body">
            <div>
              {this.state.warning && (
                <div className="warning">{this.state.warning}</div>
              )}
              {this.state.next ? (
                <div className="upload-poster-panel-category">
                  {this.props.categories.map((category) => (
                    <label
                      key={category._id}
                      className={` ${
                        this.state.pickedCategory === category._id && 'active'
                      }`}
                      onClick={() => {
                        this.setState({ pickedCategory: category._id })
                      }}
                    >
                      {category.name}
                    </label>
                  ))}
                </div>
              ) : (
                <div>
                  <Input
                    data={{
                      type: 'text',
                      name: 'title',
                      placeholder: 'title',
                      title: this.state.title,
                    }}
                    onChange={this.handleChange}
                  />
                  <DropZone name="image" onChange={this.handleImage} />
                </div>
              )}
            </div>
          </div>
          <div className="foot">
            {!this.state.next ? (
              <Button
                classes="success"
                onClick={() => this.setState({ next: true, warning: null })}
              >
                next
              </Button>
            ) : (
              <Button classes="success" onClick={this.handleUpload}>
                confirm
              </Button>
            )}
            <Button classes="danger" onClick={this.props.onCancel}>
              cancel
            </Button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapState = (state) => ({
  categories: state.category.list,
})

const mapDispatch = (dispatch) => ({
  addPost: (form) => dispatch(addPost(form)),
})
export default connect(mapState, mapDispatch)(uploadPosterPanel)
