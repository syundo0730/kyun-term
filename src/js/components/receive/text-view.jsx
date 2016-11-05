import React from 'react'
import { connect } from 'react-redux'
import { setSendBuffer } from '../../actions/action-creators'

const LOG_BUFFER_SIZE = 1000
const sendDateStyle = {
  color: 'rgb(0, 188, 212)'
}

class TextView extends React.Component {
  getLogText() {
    const { log } = this.props
    let logTexts = []
    for (let i = 0, len = log; i < log.length; ++i) {
      if (i > LOG_BUFFER_SIZE) {
        break
      }
      const _log = log[i]
      if (_log.sendData) {
        logTexts.push(
          <p key={`send_${i}`} style={sendDateStyle}>{`> ${_log.sendData}`}</p>
        )
      }
      if (_log.receivedData) {
        const stringExpression = _log.receivedData.toString('utf8')
        logTexts.push(
          <p key={`received_${i}`}>{stringExpression}</p>
        )
      }
    }
    return logTexts
  }
  render() {
    return (
      <div>
        {this.getLogText()}
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    log: state.serialPortState.log
  }
})(TextView)