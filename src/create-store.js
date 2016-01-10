import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from './promise-middleware'
import * as reducers from './reducers'

export default function(data) {
  var reducer = combineReducers(reducers)
  var finalCreateStore = applyMiddleware(thunk, promiseMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}
