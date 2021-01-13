import { combineReducers } from 'redux'

// reducers
import ui from './entities/ui'
import user from './entities/user'
import post from './entities/post'
import comment from './entities/comment'
import category from './entities/category'

export default combineReducers({
  ui,
  user,
  post,
  comment,
  category,
})
