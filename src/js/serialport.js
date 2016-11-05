class mockSerialPort {
  constructor() {}
  static list() {}
  open() {}
  on() {}
  write() {}
}

const windowExists = (typeof window === 'object')
const SerialPort =  windowExists ? require('electron').remote.require('serialport') : mockSerialPort

export default SerialPort
