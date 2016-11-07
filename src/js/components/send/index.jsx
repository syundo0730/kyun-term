import React from 'react'
import { connect } from 'react-redux'
import { send } from '../../actions/action-creators'
import TextInput from './text-input.jsx'
import SliderInput from './slider-input.jsx'
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff'
import EditorShortText from 'material-ui/svg-icons/editor/short-text'
import ImageTune from 'material-ui/svg-icons/image/tune'
import ContentSend from 'material-ui/svg-icons/content/send'

class Send extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = () => {
      const { sendBuffer } = this.props
      this.props.dispatch(send(sendBuffer))
    }
  }
  render() {
    const { isPortOpen } = this.props
    return (
      <Card>
        <CardHeader title='Send Data' />
        <Tabs>
          <Tab icon={<EditorShortText />}>
            <TextInput />
          </Tab>
          <Tab icon={<ImageTune />}>
            <SliderInput />
          </Tab>
        </Tabs>
        <RaisedButton
          label='Send'
          primary={true}
          disabled={!isPortOpen}
          onTouchTap={this.handleSubmit} />
      </Card>
    )
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.send.buffer ? state.serialPortState.send.buffer : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(Send)