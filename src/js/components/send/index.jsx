import React from 'react'
import { connect } from 'react-redux'
import { send } from '../../actions/action-creators'
import TextInput from './text-input.jsx'
import SliderInput from './slider-input.jsx'
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import EditorShortText from 'material-ui/svg-icons/editor/short-text'
import ImageTune from 'material-ui/svg-icons/image/tune'
import Checkbox from 'material-ui/Checkbox'

const styles = {
  checkbox: {
    margin: 'auto 20px'
  },
  sendArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendOnChange: false
    }
    this.handleSubmit = () => {
      const { sendBuffer } = this.props
      this.props.dispatch(send(sendBuffer))
    }
    this.handleSendCheckChange = (event, isInputChecked) => {
      this.setState({
        sendOnChange: isInputChecked
      })
    }
  }
  render() {
    const { isPortOpen } = this.props
    return (
      <Card>
        <CardHeader title='Send Data' />
        <Tabs>
          <Tab icon={<EditorShortText />}>
            <TextInput sendOnChange={this.state.sendOnChange} />
          </Tab>
          <Tab icon={<ImageTune />}>
            <SliderInput sendOnChange={this.state.sendOnChange} />
          </Tab>
        </Tabs>
        <div style={styles.sendArea}>
          <RaisedButton
            label='Send'
            primary={true}
            disabled={!isPortOpen}
            onTouchTap={this.handleSubmit} />
          <Checkbox
            label="Send on change"
            checked={this.state.sendOnChange}
            onCheck={this.handleSendCheckChange}
            disabled={!isPortOpen}
            style={styles.checkbox} />
        </div>
      </Card>
    )
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.buffer.send ? state.serialPortState.buffer.send : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(Send)