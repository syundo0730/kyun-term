var initialTimeState = {
  list: {
    ports: []
  },
  log: []
}

export function serialPortState(state = initialTimeState, action) {
  console.log('serialPortState reducer called with state ', state , ' and action ', action);

  switch (action.type) {
    case 'LIST_REQUEST':
      return {
        ...state,
        list: {
          ports: []
        }
      }
    case 'LIST_SUCCESS':
      return {
        ...state,
        list: {
          ports: action.result.ports
        }
      }
    case 'LIST_FAILURE':
      return {
        ...state,
        list: {
          ports: action.error.ports
        }
      }
    case 'OPEN_PORT_REQUEST':
      return {
        ...state,
        port: {
          frozen: true
        }
      }
    case 'OPEN_PORT_SUCCESS':
      return {
        ...state,
        port: {
          frozen: false,
          status: action.result.status,
          info: {
          }
        }
      }
    case 'OPEN_PORT_FAILURE':
      return {
        ...state,
        port: {
          frozen: false,
          status: action.error.status
        }
      }
    case 'SEND_REQUEST':
      return {
        ...state,
        send: {
          frozen: true
        }
      }
    case 'SEND_SUCCESS':
      return {
        ...state,
        send: {
          frozen: false,
          status: action.result.status
        },
        log: []
      }
    case 'SEND_FAILURE':
      return {
        ...state,
        send: {
          frozen: false,
          status: action.error.status
        }
      }
    case 'READ_REQUEST':
      return {
        ...state,
        read: {
          frozen: false
        }
      }
    case 'READ_SUCCESS':
      return {
        ...state,
        read: {
          frozen: false,
          status: action.result.status
        },
        log: []
      }
    case 'READ_FAILURE':
      return {
        ...state,
        read: {
          frozen: false,
          status: action.error.status
        }
      }
    default:
      return state
  }
}
