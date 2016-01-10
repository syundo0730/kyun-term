import Promise from 'bluebird'
const SerialPort = window.require("remote").require("serialport").SerialPort
var serialPort = null

export function open(portName, baudrate) {
  return function(dispatch) {
    dispatch({
      type: 'OPEN_PORT_REQUEST',
      portName,
      baudrate
    })
    serialPort = new SerialPort(portName, {
      baudrate
    }, false);
    serialPort.open(function(error) {
      if (error) {
        dispatch({
          type: 'OPEN_PORT_FAILURE',
          result: {
            status: error
          }
        })
      } else {
        dispatch({
          type: 'OPEN_PORT_SUCCESS',
          result: {
            status: 'port opened'
          }
        })
        dispatch({
          type: 'READ_REQUEST'
        })
        serialPort.on('data', function(data) {
          dispatch({
            type: 'READ_SUCCESS',
            result: {
              status: data
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
    types: ['SEND_REQUEST', 'SEND_SUCCESS', 'SEND_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          serialPort.write(data, function(error, results) {
            if (error) {
              reject({
                status: error
              });
            } else if (results) {
              resolve({
                status: `send ${results} chars`
              })
            } else {
              reject({
                status: 'error'
              })
            }
          })
        } catch(error) {
          reject({
            status: 'Port is still not opened'
          })
        }
      })
    }
  }
}
