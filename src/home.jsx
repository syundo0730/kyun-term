import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './action-creators'

class Home extends React.Component {
  onOpenButtonClick () {
    this.props.dispatch(actionCreators.open('/dev/tty.usbmodem1412', 9800))
  }
  onSendButtonClick (delay) {
    this.props.dispatch(actionCreators.send('hoge'))
  }
  onReadButtonClick (delay) {
    this.props.dispatch(actionCreators.read())
  }
  componentDidMount () {
    // console.log('start read')
    // this.props.dispatch(actionCreators.read())
  }
  render () {
    var { frozen, status, reduxState } = this.props
    var attrs = {}

    // if (frozen) {
    //     attrs = {
    //       disabled: true
    //     }
    // }

    return (
      <div>
        <h1>npm serial redux test</h1>
        <span>
          <b>Serialport status?</b> { status ? `${status}` : 'No connection yet...' }
        </span>
        <br /> <br /> <br />
        {/* We register our button "onClick" handler here: */}
        <button { ...attrs } onClick={() => this.onOpenButtonClick()}>Open!</button>
        <button { ...attrs } onClick={() => this.onSendButtonClick()}>Send!</button>
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
      reduxState: state
    }
})(Home);
