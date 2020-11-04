import { combineReducers } from 'redux'

import article from './article/reducer'
import user from './user/reducer'

// 1、reduces可以分模板拆开来实现，然后
// 2、conbineReducers将所有的reducers合并成一个
export default combineReducers({
  user,
  article
})
