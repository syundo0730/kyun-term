import { LIST,
  OPEN_PORT,
  CLOSE_PORT,
  READ,
  SEND,
  SET_SEND_BUFFER,
  SET_PORT_CONFIG } from '../constants/action-types'

var initialSerialPortState = {
  list: {}, port: {}, send: {}, read: {}, log: [], buffer: {}
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
    case CLOSE_PORT.REQUEST:
      return {
        ...state
      }
    case CLOSE_PORT.SUCCESS:
      return {
        ...state,
        port: {
          frozen: false
        }
      }
    case CLOSE_PORT.FAILURE:
      return {
        ...state
      }
    case SEND.REQUEST:
      return {
        ...state,
        send: Object.assign(state.send, {
          frozen: true
        })
      }
    case SEND.SUCCESS:
      return {
        ...state,
        send: {
          frozen: false,
          info: action.result.info
        },
        log: [
          { sendData: action.result.info.sendData },
          ...state.log
        ]
      }
    case SEND.FAILURE:
      return {
        ...state,
        send: Object.assign(state.send, {
          frozen: false,
          status: action.error.status
        })
      }
    case SET_SEND_BUFFER:
      return {
        ...state,
        buffer: {
          send: action.data
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
          receivedData: action.result.receivedData
        },
        log: [
          { receivedData: action.result.receivedData },
          ...state.log
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