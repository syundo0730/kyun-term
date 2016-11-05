import configureMockStore from 'redux-mock-store'
import sinon from 'sinon'
import expect from 'expect'
import thunk from 'redux-thunk'
import promiseMiddleware from '../../src/js/middlewares/promise-middleware'
import promiseSequenceMiddleware from '../../src/js/middlewares/promise-sequence-middleware'
import * as actions from '../../src/js/actions/action-creators'
import SerialPort from '../../src/js/serialport'
import * as types from '../../src/js/constants/action-types'

const middlewares = [ thunk, promiseSequenceMiddleware, promiseMiddleware]
const mockStore = configureMockStore(middlewares)
const port = new SerialPort()

describe('async actions', () => {
  describe('list', () => {
    afterEach(() => SerialPort.list.restore())

    it('creates LIST_SUCCESS when listing serial ports has been done', () => {
      sinon.stub(SerialPort, 'list', (callback) => callback(null, ['port0']))
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
      sinon.stub(SerialPort, 'list', (callback) => callback('test error', ['port0']))
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
      sinon.stub(SerialPort, 'list', (callback) => callback(null, null))
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
      sinon.stub(SerialPort, 'list', () => { throw new Error('UNKNOWN_ERROR')})
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
