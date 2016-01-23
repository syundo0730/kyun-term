import _ from 'lodash'

const serialport = window.require('remote').require('serialport')
const SerialPort = serialport.SerialPort
var port = null

export const WAIT_MS = {
  REQUEST : 'WAIT_MS_REQUEST',
  SUCCESS : 'WAIT_MS_SUCCESS',
  FAILURE : 'WAIT_MS_FAILURE'
}
export function waitMs(delay) {
  return {
    types: _.values(WAIT_MS),
    promise: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            delay
          })
        }, delay)
      })
    }
  }
}

export const LIST = {
  REQUEST : 'LIST_REQUEST',
  SUCCESS : 'LIST_SUCCESS',
  FAILURE : 'LIST_FAILURE'
}
export function list() {
  return {
    types: _.values(LIST),
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          serialport.list(function(error, ports) {
            if (error) {
              reject({
                status: error
              })
            } else if (ports) {
              resolve({
                ports
              })
            } else {
              reject({
                status: 'unknown error'
              })
            }
          })
        } catch(error) {
          reject({
            status: 'unknown error'
          })
        }
      })
    }
  }
}

export const OPEN_PORT = {
  REQUEST : 'OPEN_PORT_REQUEST',
  SUCCESS : 'OPEN_PORT_SUCCESS',
  FAILURE : 'OPEN_PORT_FAILURE'
}
export const READ = {
  REQUEST : 'READ_REQUEST',
  SUCCESS : 'READ_SUCCESS',
  FAILURE : 'READ_FAILURE'
}
export function open(portName, baudrate) {
  return function(dispatch) {
    let info = {
      portName,
      baudrate
    }
    dispatch({
      type: OPEN_PORT.REQUEST
    })
    port = new SerialPort(portName, {
      baudrate
    }, false)
    port.open(function(error) {
      if (error) {
        dispatch({
          type: OPEN_PORT.FAILURE,
          error: {
            status: error,
            info
          }
        })
      } else {
        dispatch({
          type: OPEN_PORT.SUCCESS,
          result: {
            info
          }
        })
        dispatch({
          type: READ.REQUEST
        })
        port.on('data', function(data) {
          dispatch({
            type: READ.SUCCESS,
            result: {
              recievedData: data
            }
          })
        })
      }
    })
  }
}

export const SEND = {
  REQUEST : 'SEND_REQUEST',
  SUCCESS : 'SEND_SUCCESS',
  FAILURE : 'SEND_FAILURE'
}
export function send(data) {
  return {
    data: data,
    types: _.values(SEND),
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          port.write(data, function(error, results) {
            if (error) {
              reject({
                status: error
              })
            } else if (results) {
              resolve({
                info: {
                  length: results,
                  sendData: data
                }
              })
            } else {
              reject({
                status: 'error'
              })
            }
          })
        } catch(error) {
          reject({
            status: 'error'
          })
        }
      })
    }
  }
}

export const SEND_MULTI = {
  REQUEST : 'SEND_MULTI_REQUEST',
  SUCCESS : 'SEND_MULTI_SUCCESS',
  FAILURE : 'SEND_MULTI_FAILURE'
}
export function sendWithInterval(data) {
  var payload = data.items.reduce((result, item) => result.concat([send.bind(null, item), waitMs.bind(null, data.interval)]), [])
  return {
    types: _.values(SEND_MULTI),
    sequence: true,
    payload
  }
}
