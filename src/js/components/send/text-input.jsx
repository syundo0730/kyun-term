import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import { setSendBuffer } from '../../actions/action-creators'

const styles = {
  root: {
    minHeight: 120
  }
}
class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = (event) => {
      const str = event.target.value
      this.props.dispatch(setSendBuffer(new Buffer(str)))
    }
  }
  render() {
    const { sendBuffer, isPortOpen } = this.props
    return (
      <div style={styles.root}>
        <TextField
          id="text-field-send-data"
          multiLine={true}
          fullWidth={true}
          value={sendBuffer.toString()}
          disabled={!isPortOpen}
          onChange={this.handleChange} />
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.buffer.send ? state.serialPortState.buffer.send : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(TextInput)