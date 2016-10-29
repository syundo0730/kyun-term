const mockSerialPort = {
  list: () => {},
  SerialPort: () => {
  }
}
mockSerialPort.SerialPort.prototype.open = () => {}
mockSerialPort.SerialPort.prototype.on = () => {}
mockSerialPort.SerialPort.prototype.write = () => {}

export const windowExists = (typeof window === 'object')

export const serialport =  require('electron').remote.require('serialport')
