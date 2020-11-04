import thunk from 'redux-thunk'
import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducers' // 合并后的reducer

let storeEnhancers
if (process.env.NODE_ENV === 'production') {
  storeEnhancers = compose(applyMiddleware(thunk))
} else {
  // storeEnhancers = compose(composeWithDevTools(applyMiddleware(thunk, logger)))
  storeEnhancers = compose(composeWithDevTools(applyMiddleware(thunk)))
}

const configureStore = (initialState = {}) => {
  // usage: createStore(reducer, [initialState], enhancer)
  const store = createStore(rootReducer, initialState, storeEnhancers)

  if (module.hot && process.env.NODE_ENV !== 'production') {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducers', () => {
      console.log('replacing reducer...')
      const nextRootReducer = require('./rootReducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore()
