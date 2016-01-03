import Promise from 'bluebird'
//var SerialPort = require("serialport").SerialPort

export function getTime(delay) {
  return {
    types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        // Just simulating an async request to a server via a setTimeout
        setTimeout(() => {
          const d = new Date()
          const ms = ('000' + d.getMilliseconds()).slice(-3)
          resolve({
            time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
          })
        }, delay)
      })
    }
  }
}

export function open(portName, baudrate) {
  return {
    types: ['OPEN_PORT_REQUEST', 'OPEN_PORT_SUCCESS', 'OPEN_PORT_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        var serialPort = new SerialPort(portName, {
          baudrate
        }, false);
        serialPort.open(function(err) {
          if (error) {
            reject({
              status: error
            });
            return;
          } else {
            resolve({
              status: 'port open'
            })
          }
        })
      })
    }
  }
}

export function send(data) {
  return {
    data: data,
    types: ['SEND_REQUEST', 'SEND_SUCCESS', 'SEND_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        serialPort.write(data, function(error, results) {
          if (error) {
            reject({
              status: error
            });
            return;
          }
          if (results) {
            resolve({
              status: results
            })
          }
        })
      })
    }
  }
}
