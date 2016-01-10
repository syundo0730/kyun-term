export default function promiseMiddleware() {
  return (next) => (action) => {
    const { promise, types, ...rest } = action

    if (!promise) {
      return next(action)
    }

    const [PENDING, FULFILLED, REJECTED] = types

    next({...rest, type: PENDING})

    return promise().then(
      (result) => {
        next({...rest, result, type: FULFILLED})
      },
      (error) => {
        next({...rest, error, type: REJECTED})
      }
    )
  }
}
