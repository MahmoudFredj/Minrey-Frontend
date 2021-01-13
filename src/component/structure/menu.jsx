import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadCategory,
  addCategory,
  removeCategory,
  editCategory,
} from '../../store/entities/category'
import { switchPhoneMenu } from '../../store/entities/ui'
import Button from '../util/button'
import Input from '../util/input'
import Joi from 'joi'

class Menu extends Component {
  state = {
    createMode: false,
    category: '',
    warning: '',
  }

  componentDidMount() {
    this.props.loadCategory()
  }

  handleChange = (e) => {
    this.setState({ category: e.target.value })
  }

  handleConfirm = () => {
    const category = { name: this.state.category }
    this.setState({ warning: '' })
    //verfiying input
    const schema = Joi.object({
      name: Joi.string().min(3).max(10).required(),
    })

    console.log(category)
    const { error } = schema.validate(category)
    if (error) return this.setState({ warning: error.details[0].message })

    this.props.addCategory(category)
    this.setState({ createMode: false })
  }
  handleDelete = (id) => {
    console.log(id)
    const data = { _id: id }
    this.props.removeCategory(data)
  }
  render() {
    return (
      <menu className={`main-menu ${this.props.classes}`}>
        <h3>sections:</h3>
        {this.props.user && this.props.user.isAdmin && (
          <Button
            style={{ width: '100%', height: '30px' }}
            classes={this.state.createMode && 'danger'}
            onClick={() =>
              this.setState({ createMode: !this.state.createMode })
            }
          >
            {this.state.createMode ? 'cancel' : 'add'}
          </Button>
        )}
        {this.state.createMode && (
          <Input
            data={{
              type: 'text',
              name: 'category',
              placeholder: 'category',
              value: this.state.category,
              warning: this.state.warning,
            }}
            onChange={this.handleChange}
            onConfirm={this.handleConfirm}
          />
        )}
        {this.props.loading && <span>loading ...</span>}
        {this.props.categories.map((category) => (
          <div key={category._id} className="link" style={{ widht: '100%' }}>
            <a
              href={`#${category._id}`}
              onClick={() => this.props.switchPhoneMenu(false)}
            >
              <span>{category.name}</span>
            </a>
            {this.props.user && this.props.user.isAdmin && (
              <span
                className="sm-btn danger btn"
                style={{ float: 'right' }}
                onClick={() => {
                  this.handleDelete(category._id)
                }}
              >
                delete
              </span>
            )}
          </div>
        ))}
      </menu>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userInfo,
  categories: state.category.list,
  loading: state.category.loading,
})

const mapDispatch = (dispatch) => ({
  loadCategory: () => dispatch(loadCategory()),
  addCategory: (category) => dispatch(addCategory(category)),
  editCategory: (category) => dispatch(editCategory(category)),
  removeCategory: (category) => dispatch(removeCategory(category)),
  switchPhoneMenu: (value) => dispatch(switchPhoneMenu(value)),
})

export default connect(mapState, mapDispatch)(Menu)
