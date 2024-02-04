import { combineReducers } from 'redux'

import { getPostsListReducer } from './reducers/postList'
import { changePageReducer } from './reducers/pagination.reducer'
import { getPostReducer } from './reducers/getPost.reducer'
import { formReducer } from './reducers/registration.reducer'
import { usersData } from './reducers/usersData.reducer'
import { updateUserReducer } from './reducers/updateUser.reducer'
import { createPostReducer } from './reducers/createPost.reducer'
import { deletePostReducer } from './reducers/deletePost.reducer'
import { getLikesReducer } from './reducers/getLikes.reducer'

const rootReducer = combineReducers({
  getPostsListReducer,
  changePageReducer,
  getPostReducer,
  formReducer,
  usersData,
  updateUserReducer,
  createPostReducer,
  deletePostReducer,
  getLikesReducer,
})

export default rootReducer
