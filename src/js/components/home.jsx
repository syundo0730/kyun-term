import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/action-creators'

export class Home extends React.Component {
  componentWillMount () {
    this.props.dispatch(actionCreators.list())
  }
  onOpenButtonClick () {
    this.props.dispatch(actionCreators.open('/dev/cu.usbmodem1412', 9800))
  }
  onSendButtonClick () {
    this.props.dispatch(actionCreators.send(String.fromCharCode.apply(null, [97, 98, 99])))
  }
  onSendWithIntervalButtonClick () {
    this.props.dispatch(actionCreators.sendWithInterval({
      items: ['hoge1', 'hoge2', 'hoge3', 'hoge4'],
      interval: 1000
    }))
  }
  render () {
    const { list, port, send, read, reduxState } = this.props

    return (
      <div>
        <span>
          <b>Serialport status?</b> { port.info ? `${port.info.portName || 'No port'} opened` : 'No info' }
        </span>
        <ol>
        { list.ports ? list.ports.map(function (port, index) { return (<li key={index}>{port.comName}</li>) }) : 'no ports'}
        </ol>
        <div>
          <b>Data</b> { read.recievedData ? `${read.recievedData}` : 'No data yet...' }
        </div>
        <button disabled = {!!(port.frozen)} onClick={() => this.onOpenButtonClick()}>Open!</button>
        <button disabled = {!!(send.frozen)} onClick={() => this.onSendButtonClick()}>Send!</button>
        <button disabled = {!!(send.frozen)} onClick={() => this.onSendWithIntervalButtonClick()}>Send Multi!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

export default connect((state/*, props*/) => {
  return {
    list: state.serialPortState.list,
    port: state.serialPortState.port,
    send: state.serialPortState.send,
    read: state.serialPortState.read,
    log : state.serialPortState.log,
    reduxState: state
  }
})(Home)
