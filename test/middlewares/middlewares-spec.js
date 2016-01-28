import expect from 'expect'
import promiseMiddleware from '../../src/js/middlewares/promise-middleware'

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null
  const dispatch = promiseMiddleware()(actionAttempt => dispatched = actionAttempt)
  dispatch(action)
  return dispatched
}

describe('middleware', () => {
  it('should dispatch if store is empty', () => {
    const action = {
      types: ['PENDING', 'FULFILLED', 'REJECTED'],
      promise: () => {
        return new Promise((resolve) => {
          resolve()
        })
      }
    }

    expect(
      dispatchWithStoreOf({}, action)
    ).toEqual({ type: 'PENDING' })
  })

  it('should pass through action if promise is not exist as property', () => {
    const action = {
      type: 'ACTION_TYPE',
      rest: 'values'
    }

    expect(
      dispatchWithStoreOf({}, action)
    ).toEqual({ type: 'ACTION_TYPE', rest: 'values' })
  })
})
