const serialport = window.require("remote").require("serialport")
const SerialPort = serialport.SerialPort
var port = null

export function waitMs(delay) {
  return {
    types: ['WAIT_MS_REQUEST', 'WAIT_MS_SUCCESS', 'WAIT_MS_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            time: `${delay} ms`
          })
        }, delay)
      })
    }
  }
}

export function list() {
  return {
    types: ['LIST_REQUEST', 'LIST_SUCCESS', 'LIST_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        try {
          serialport.list(function(error, ports) {
            if (error) {
              reject({
                ports: [],
                status: error
              });
            } else if (ports) {
              resolve({
                ports
              })
            } else {
              reject({
                ports: []
              })
            }
          })
        } catch(error) {
          reject({
            ports: []
          })
        }
      })
    }
  }
}

export function open(portName, baudrate) {
  return function(dispatch) {
    dispatch({
      type: 'OPEN_PORT_REQUEST',
      portName,
      baudrate
    })
    port = new SerialPort(portName, {
      baudrate
    }, false);
    port.open(function(error) {
      if (error) {
        dispatch({
          type: 'OPEN_PORT_FAILURE',
          error: {
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
        port.on('data', function(data) {
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
          port.write(data, function(error, results) {
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

export function sendMultiData() {
  return {
    types: ['SEND_MULTI_REQUEST', 'SEND_MULTI_SUCCESS', 'SEND_MULTI_FAILURE'],
    sequence: true,
    payload: [
      send.bind(null, 'hoge1'),
      waitMs.bind(null, 1000),
      send.bind(null, 'hoge2'),
      waitMs.bind(null, 3000),
      send.bind(null, 'hoge3')]
  }
}
