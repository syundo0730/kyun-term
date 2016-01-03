import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './action-creators'

class Home extends React.Component {
  onOpenButtonClick () {
    this.props.dispatch(actionCreators.open('/dev/tty-usbserial1', 9800))
  }
  onSendButtonClick (delay) {
    this.props.dispatch(actionCreators.send('hoge'))
  }
  render () {

    var { frozen, status, reduxState } = this.props
    var attrs = {}
    const DELAY = 500 // in ms

    if (frozen) {
        attrs = {
          disabled: true
        }
    }

    return (
      <div>
        <h1>npm serial redux test</h1>
        <span>
          <b>Serialport status?</b> { status ? `Current status is ${status}` : 'No connection yet...' }
        </span>
        <br /> <br /> <br />
        {/* We register our button "onClick" handler here: */}
        <button { ...attrs } onClick={() => this.onOpenButtonClick(DELAY)}>Open!</button>
        <button { ...attrs } onClick={() => this.onSendButtonClick(DELAY)}>Send!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
      </div>
    )
  }
}

export default connect((state/*, props*/) => {
    return {
      reduxState: state,
      frozen: state._time.frozen,
      time: state._time.time
    }
})(Home);
