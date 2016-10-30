import React from 'react'
import { connect } from 'react-redux'
import { setSendBuffer } from '../../actions/action-creators'

class TextView extends React.Component {
  render() {
    const { receivedData } = this.props
    return (
      <div>
        {receivedData}
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  const recievedData = state.serialPortState.read.recievedData;
  return {
    receivedData: recievedData ? receivedData : ''
  }
})(TextView)