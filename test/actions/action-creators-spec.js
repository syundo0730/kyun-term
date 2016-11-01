import configureMockStore from 'redux-mock-store'
import sinon from 'sinon'
import expect from 'expect'
import thunk from 'redux-thunk'
import promiseMiddleware from '../../src/js/middlewares/promise-middleware'
import promiseSequenceMiddleware from '../../src/js/middlewares/promise-sequence-middleware'
import * as actions from '../../src/js/actions/action-creators'
import { port } from '../../src/js/actions/action-creators'
import * as types from '../../src/js/constants/action-types'
import { serialport } from '../../src/js/serialport'

const middlewares = [ thunk, promiseSequenceMiddleware, promiseMiddleware]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  describe('list', () => {
    afterEach(() => serialport.list.restore())

    it('creates LIST_SUCCESS when listing serial ports has been done', () => {
      sinon.stub(serialport, 'list', (callback) => callback(null, ['port0']))
      const initialState = {}
      const expectedActions = [
        { type: types.LIST.REQUEST },
        {
          type: types.LIST.SUCCESS,
          result: {
            ports: ['port0']
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.list()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates LIST_FAILURE when listing serial ports has failed', () => {
      sinon.stub(serialport, 'list', (callback) => callback('test error', ['port0']))
      const initialState = {}
      const expectedActions = [
        { type: types.LIST.REQUEST },
        {
          type: types.LIST.FAILURE,
          error: {
            status: 'test error'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.list()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates LIST_FAILURE when no serial ports listed', () => {
      sinon.stub(serialport, 'list', (callback) => callback(null, null))
      const initialState = {}
      const expectedActions = [
        { type: types.LIST.REQUEST },
        {
          type: types.LIST.FAILURE,
          error: {
            status: 'no ports'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.list()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates LIST_FAILURE when listing serial ports has failed with unknown error', () => {
      sinon.stub(serialport, 'list', () => { throw new Error('UNKNOWN_ERROR')})
      const initialState = {}
      const expectedActions = [
        { type: types.LIST.REQUEST },
        {
          type: types.LIST.FAILURE,
          error: {
            status: 'unknown error'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.list()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('open', () => {
    afterEach(() => {
      port.open.restore()
    })
    after(() => {
      port.on.restore()
    })

    it('creates OPEN_PORT_SUCCESS when opening serial ports has been done', () => {
      sinon.stub(port, 'open', (callback) => callback(null))
      sinon.stub(port, 'on', (name, callback) => callback('test data'))
      const initialState = {}
      const expectedActions = [
        { type: types.OPEN_PORT.REQUEST },
        {
          type: types.OPEN_PORT.SUCCESS,
          result: {
            info: {
              portName: '/dev/cu.usbmodem1412',
              baudrate: 9800
            }
          }
        },
        { type: types.READ.REQUEST },
        {
          type: types.READ.SUCCESS,
          result: {
            receivedData: 'test data'
          }
        },
        {
          type: types.OPEN_PORT.FAILURE,
          error: {
            status: 'disconnected'
          }
        },
        {
          type: types.OPEN_PORT.FAILURE,
          error: {
            status: 'error'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.open('/dev/cu.usbmodem1412', 9800))
      expect(store.getActions()).toEqual(expectedActions)
    })

    it('creates OPEN_PORT_FAILURE when opening serial ports has failed', () => {
      sinon.stub(port, 'open', (callback) => callback('test error'))
      const initialState = {}
      const expectedActions = [
        { type: types.OPEN_PORT.REQUEST },
        {
          type: types.OPEN_PORT.FAILURE,
          error: {
            status: 'test error',
            info: {
              portName: '/dev/cu.usbmodem1412',
              baudrate: 9800
            }
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.open('/dev/cu.usbmodem1412', 9800))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('send', () => {
    const mockData = 'send test'

    afterEach(() => {
      port.write.restore()
    })

    it('creates SEND_SUCCESS when sendng data has been done', () => {
      sinon.stub(port, 'write', (data, callback) => callback(null, data.length))
      const initialState = {}
      const expectedActions = [
        { type: types.SEND.REQUEST },
        {
          type: types.SEND.SUCCESS,
          result: {
            info: {
              length: mockData.length,
              sendData: mockData
            }
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.send(mockData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates SEND_FAILURE when sending data has failed', () => {
      sinon.stub(port, 'write', (data, callback) => callback('test error', data.length))
      const initialState = {}
      const expectedActions = [
        { type: types.SEND.REQUEST },
        {
          type: types.SEND.FAILURE,
          error: {
            status: 'test error'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.send(mockData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates SEND_FAILURE when no data send', () => {
      sinon.stub(port, 'write', (data, callback) => callback(null, null))
      const initialState = {}
      const expectedActions = [
        { type: types.SEND.REQUEST },
        {
          type: types.SEND.FAILURE,
          error: {
            status: 'no data send'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.send(mockData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates SEND_FAILURE when sending data has failed with unknown error', () => {
      sinon.stub(port, 'write', (data, callback) => { throw new Error('UNKNOWN_ERROR')})
      const initialState = {}
      const expectedActions = [
        { type: types.SEND.REQUEST },
        {
          type: types.SEND.FAILURE,
          error: {
            status: 'unknown error'
          }
        }
      ]
      const store = mockStore(initialState)
      store.dispatch(actions.send(mockData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
