import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { setSendBuffer } from '../../actions/action-creators'

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = (event) => {
      const data = event.target.value
      this.props.dispatch(setSendBuffer(data))
    }
  }
  render() {
    const { sendBuffer, isPortOpen } = this.props
    return (
      <div>
        <TextField
          multiLine={true}
          fullWidth={true}
          value={sendBuffer}
          disabled={!isPortOpen}
          onChange={this.handleChange} />
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.send.buffer ? state.serialPortState.send.buffer : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(TextInput)