function isArrayOfFunctions(array) {
  return Array.isArray(array) && array.length > 0 && array.every(item => item instanceof Function)
}

export default function promiseSequenceMiddleware() {
  return (next) => (action) => {
    if (!isArrayOfFunctions(action.payload)) {
      return next(action)
    }
    const { types, sequence, payload, ...rest } = action
    const actions = payload
    const [PENDING, FULFILLED, REJECTED] = types

    next({...rest, type: PENDING})

    let promise = null
    if (sequence) {
      promise = actions.reduce((result, item) => result.then(() => next(item())), Promise.resolve());
    } else {
      promise = Promise.all(actions.map(item => next(item())));
    }

    if (!promise) {
      return next(action)
    }

    return promise.then(
      (result) => {
        next({...rest, result, type: FULFILLED})
      },
      (error) => {
        next({...rest, error, type: REJECTED})
      }
    )
  }
}
