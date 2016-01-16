import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './action-creators'

class Home extends React.Component {
  componentWillMount () {
    this.props.dispatch(actionCreators.list())
  }
  onOpenButtonClick () {
    this.props.dispatch(actionCreators.open('/dev/cu.usbmodem1412', 9800))
  }
  onSendButtonClick () {
    this.props.dispatch(actionCreators.send('hoge'))
  }
  onSendWithIntervalButtonClick () {
    this.props.dispatch(actionCreators.sendWithInterval({
      items: ['hoge1', 'hoge2', 'hoge3', 'hoge4'],
      interval: 1000
    }))
  }
  render () {
    var { frozen, status, ports, reduxState } = this.props
    var attrs = {}
    // if (frozen) {
    //     attrs = {
    //       disabled: true
    //     }
    // }
    return (
      <div>
        <span>
          <b>Serialport status?</b> { status ? `${status}` : 'No connection yet...' }
        </span>
        <ol>
        { ports ? ports.map(function (port, index) { return (<li key={index}>{port.comName}</li>) }) : 'no ports'}
        </ol>
        <button { ...attrs } onClick={() => this.onOpenButtonClick()}>Open!</button>
        <button { ...attrs } onClick={() => this.onSendButtonClick()}>Send!</button>
        <button { ...attrs } onClick={() => this.onSendWithIntervalButtonClick()}>Send Multi!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

export default connect((state/*, props*/) => {
    return {
      frozen: state.serialPortState.frozen,
      status: state.serialPortState.status,
      ports: state.serialPortState.ports,
      reduxState: state
    }
})(Home);
