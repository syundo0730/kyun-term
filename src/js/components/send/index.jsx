import React from 'react'
import { connect } from 'react-redux'
import { send } from '../../actions/action-creators'
import TextInput from './text-input.jsx'
import Card from '../common/card.jsx'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = () => {
      const { sendBuffer } = this.props
      this.props.dispatch(send(sendBuffer))
    }
  }
  render () {
    const { isPortOpen } = this.props
    return (
      <div>
        <Card title='Send Data'>
				  <TextInput />
          <RaisedButton
            label='Send'
            primary={true}
            disabled={!isPortOpen}
            onTouchTap={this.handleSubmit} />
        </Card>
      </div>
    )
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.send.buffer ? state.serialPortState.send.buffer : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(Send)