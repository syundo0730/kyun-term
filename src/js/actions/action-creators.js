import _ from 'lodash'

import {
  LIST,
  OPEN_PORT,
  CLOSE_PORT,
  READ,
  SEND,
  SET_SEND_BUFFER,
  SET_PORT_CONFIG
} from '../constants/action-types'

import SerialPort from '../serialport'

let port = null

export function list() {
  return {
    types: _.values(LIST),
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          SerialPort.list(function (error, ports) {
            if (ports) {
              resolve({
                ports
              })
            } else if (error) {
              reject({
                status: error
              })
            }
          })
        } catch (error) {
          reject({
            status: error
          })
        }
      })
    }
  }
}

export function open(portName, baudrate) {
  return function (dispatch) {
    let info = {
      portName,
      baudrate
    }
    dispatch({
      type: OPEN_PORT.REQUEST
    })
    port = new SerialPort(portName, {
      baudrate
    }, function (error) {
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
        /**
         * register on received handler
         */
        port.on('data', function (data) {
          dispatch({
            type: READ.SUCCESS,
            result: {
              receivedData: data
            }
          })
        })
        /**
         * register on disconnect handler
         */
        port.on('disconnect', function (error) {
          dispatch({
            type: OPEN_PORT.FAILURE,
            error: {
              status: error
            }
          })
        })
        /**
         * register on error handler
         */
        port.on('error', function (error) {
          dispatch({
            type: OPEN_PORT.FAILURE,
            error: {
              status: error
            }
          })
        })
      }
    })
  }
}

export function close() {
  return {
    types: _.values(CLOSE_PORT),
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          port.close((error) => {
            if (error) {
              reject({ status: error })
            } else {
              resolve({})
            }
          })
        } catch (error) {
          reject({ status: error })
        }
      })
    }
  }
}

export function send(data) {
  return {
    types: _.values(SEND),
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          port.write(data, function (error) {
            if (error) {
              reject({
                status: error
              })
            } else {
              resolve({
                info: {
                  length: 0,
                  sendData: data
                }
              })
            }
          })
        } catch (error) {
          reject({
            status: error
          })
        }
      })
    }
  }
}

export function setSendBuffer(data) {
  return {
    type: SET_SEND_BUFFER,
    data
  }
}

export function setPortConfig(port, baudrate) {
  return {
    type: SET_PORT_CONFIG,
    port,
    baudrate
  }
}