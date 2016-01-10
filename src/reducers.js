var initialTimeState = {}

export function serialPortState(state = initialTimeState, action) {
  console.log('serialPortState reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'OPEN_PORT_REQUEST':
      return {
        ...state,
        frozen: true
      }
    case 'OPEN_PORT_SUCCESS':
      return {
        ...state,
        status: action.result.status,
        frozen: false
      }
    case 'OPEN_PORT_FAILURE':
      return {
        ...state,
        status: action.error.status,
        frozen: false
      }
    case 'SEND_REQUEST':
      return {
        ...state,
        frozen: true
      }
    case 'SEND_SUCCESS':
      return {
        ...state,
        status: action.result.status,
        frozen: false
      }
    case 'SEND_FAILURE':
      return {
        ...state,
        status: action.error.status,
        frozen: false
      }
    case 'READ_REQUEST':
      return {
        ...state,
        frozen: false
      }
    case 'READ_SUCCESS':
      return {
        ...state,
        status: action.result.status,
        frozen: false
      }
    case 'READ_FAILURE':
      return {
        ...state,
        status: action.error.status,
        frozen: false
      }
    default:
      return state
  }
}
