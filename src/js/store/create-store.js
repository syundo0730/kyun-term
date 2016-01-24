import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from '../middlewares/promise-middleware'
import promiseSequenceMiddleware from '../middlewares/promise-sequence-middleware'
import * as reducers from '../reducers/reducers'

export default function(data) {
  var reducer = combineReducers(reducers)
  var finalCreateStore = applyMiddleware(thunk, promiseSequenceMiddleware, promiseMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}
