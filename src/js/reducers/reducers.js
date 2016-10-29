import { LIST, OPEN_PORT, SEND, READ, SET_PORT_CONFIG } from '../constants/action-types'

var initialSerialPortState = {
  list: {}, port: {}, send: {}, read: {}, log: []
}
export function serialPortState(state = initialSerialPortState, action) {
  console.log('serialPortState reducer called with state ', state , ' and action ', action)

  switch (action.type) {
    case LIST.REQUEST:
      return {
        ...state
      }
    case LIST.SUCCESS:
      return {
        ...state,
        list: {
          ports: action.result.ports
        }
      }
    case LIST.FAILURE:
      return {
        ...state,
        list: {
          ports: [],
          status: action.error.status
        }
      }
    case OPEN_PORT.REQUEST:
      return {
        ...state,
        port: {
          frozen: true
        }
      }
    case OPEN_PORT.SUCCESS:
      return {
        ...state,
        port: {
          frozen: true,
          info: action.result.info
        }
      }
    case OPEN_PORT.FAILURE:
      return {
        ...state,
        port: {
          frozen: false,
          status: action.error.status
        }
      }
    case SEND.REQUEST:
      return {
        ...state,
        send: {
          frozen: true
        }
      }
    case SEND.SUCCESS:
      return {
        ...state,
        send: {
          frozen: false,
          info: action.result.info
        },
        log: [
          ...state.log,
          { sendData: action.result.info.sendData }
        ]
      }
    case SEND.FAILURE:
      return {
        ...state,
        send: {
          frozen: false,
          status: action.error.status
        }
      }
    case READ.REQUEST:
      return {
        ...state,
        read: {
          frozen: true
        }
      }
    case READ.SUCCESS:
      return {
        ...state,
        read: {
          frozen: false,
          recievedData: action.result.recievedData
        },
        log: [
          ...state.log,
          { recievedData: action.result.recievedData }
        ]
      }
    case READ.FAILURE:
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

var initialConfigState = {
  port_config: {}
}
export function configState(state = initialConfigState, action) {
  switch (action.type) {
    case SET_PORT_CONFIG:
      return {
        ...state,
        portConfig: {
          port: action.port,
          baudrate: action.baudrate
        }
      }
    default:
      return state
  }
}