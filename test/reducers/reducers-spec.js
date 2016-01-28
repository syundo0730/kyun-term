import expect from 'expect'
import { serialPortState } from '../../src/js/reducers/reducers'
import * as types from '../../src/js/constants/action-types'

describe('reducer', () => {
  describe('serialport-state', () => {
    it('should return the initial state', () => {
      expect(
        serialPortState(undefined, {})
      ).toEqual({
        list: {},
        port: {},
        send: {},
        read: {},
        log: []
      })
    })
    describe('LIST', () => {
      it('should handle LIST_REQUEST', () => {
        expect(
          serialPortState({}, {
            type: types.LIST.REQUEST
          })
        ).toEqual({})
      })
      it('should handle LIST_SUCCESS', () => {
        expect(
          serialPortState({}, {
            type: types.LIST.SUCCESS,
            result: {
              ports: [
                'port0',
                'port1'
              ]
            }
          })
        ).toEqual({
          list: {
            ports: [
              'port0',
              'port1'
            ]
          }
        })
      })
      it('should handle LIST_FAILURE', () => {
        expect(
          serialPortState({}, {
            type: types.LIST.FAILURE,
            error: {
              ports: [],
              status: 'error'
            }
          })
        ).toEqual({
          list: {
            ports: [],
            status: 'error'
          }
        })
      })
    })
    describe('OPEN_PORT', () => {
      it('should handle OPEN_PORT_REQUEST', () => {
        expect(
          serialPortState({}, {
            type: types.OPEN_PORT.REQUEST
          })
        ).toEqual({
          port: {
            frozen: true
          }
        })
      })
      it('should handle OPEN_PORT_SUCCESS', () => {
        expect(
          serialPortState({}, {
            type: types.OPEN_PORT.SUCCESS,
            result: {
              info: {
                portName: 'port0',
                baudrate: 9800
              }
            }
          })
        ).toEqual({
          port: {
            frozen: true,
            info: {
              portName: 'port0',
              baudrate: 9800
            }
          }
        })
      })
      it('should handle OPEN_PORT_FAILURE', () => {
        expect(
          serialPortState({}, {
            type: types.OPEN_PORT.FAILURE,
            error: {
              status: 'error',
              info: {
                portName: 'port0',
                baudrate: 9800
              }
            }
          })
        ).toEqual({
          port: {
            frozen: false,
            status: 'error'
          }
        })
      })
    })
    describe('SEND', () => {
      it('should handle SEND_REQUEST', () => {
        expect(
          serialPortState({}, {
            type: types.SEND.REQUEST
          })
        ).toEqual({
          send: {
            frozen: true
          }
        })
      })
      it('should handle SEND_SUCCESS', () => {
        expect(
          serialPortState({
            log: []
          }, {
            type: types.SEND.SUCCESS,
            result: {
              info: {
                length: 3,
                sendData: 'hoge'
              }
            }
          })
        ).toEqual({
          send: {
            frozen: false,
            info: {
              length: 3,
              sendData: 'hoge'
            }
          },
          log: [{
            sendData: 'hoge'
          }]
        })
      })
      it('should handle SEND_FAILURE', () => {
        expect(
          serialPortState({}, {
            type: types.SEND.FAILURE,
            error: {
              status: 'error'
            }
          })
        ).toEqual({
          send: {
            frozen: false,
            status: 'error'
          }
        })
      })
    })
    describe('READ', () => {
      it('should handle READ_REQUEST', () => {
        expect(
          serialPortState({}, {
            type: types.READ.REQUEST
          })
        ).toEqual({
          read: {
            frozen: true
          }
        })
      })
      it('should handle READ_SUCCESS', () => {
        expect(
          serialPortState({
            log: []
          }, {
            type: types.READ.SUCCESS,
            result: {
              recievedData: 'hoge'
            }
          })
        ).toEqual({
          read: {
            frozen: false,
            recievedData: 'hoge'
          },
          log: [{
            recievedData: 'hoge'
          }]
        })
      })
      it('should handle READ_FAILURE', () => {
        expect(
          serialPortState({}, {
            type: types.READ.FAILURE,
            error: {
              status: 'error'
            }
          })
        ).toEqual({
          read: {
            frozen: false,
            status: 'error'
          }
        })
      })
    })
  })
})
