import _ from 'lodash'

import { WAIT_MS, LIST, OPEN_PORT, READ, SEND, SEND_MULTI } from '../constants/action-types'

import { serialport, SerialPort } from '../serialport'
var port = null

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

export function sendWithInterval(data) {
  var payload = data.items.reduce((result, item) => result.concat([send.bind(null, item), waitMs.bind(null, data.interval)]), [])
  return {
    types: _.values(SEND_MULTI),
    sequence: true,
    payload
  }
}
