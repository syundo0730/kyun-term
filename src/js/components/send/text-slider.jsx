import React from 'react'
import { connect } from 'react-redux'
import { setSendBuffer } from '../../actions/action-creators'
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 65
  },
  slider: {
    width: '50%'
  },
  text: {
    width: 50
  }
};

class TextSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    const { onChange, valueRange } = props
    this.handleSliderChange = (event, value) => {
      this.setState({ value });
      onChange(value)
    }
    this.handleTextChange = (event, value) => {
      let integerValue = 0
      if (value) {
        integerValue = parseInt(value, 10)
        const { min, max } = valueRange
        if (integerValue > max) {
          integerValue = max
        } else if (integerValue < min) {
          integerValue = min
        }
      }
      this.setState({ value: integerValue });
      onChange(integerValue)
    }
  }
  render() {
    const { isPortOpen, valueRange } = this.props
    return (
      <div style={styles.root}>
        <Slider
          min={valueRange.min}
          max={valueRange.max}
          step={valueRange.step}
          defaultValue={0}
          value={this.state.value}
          // disabled={!isPortOpen}
          style={styles.slider}
          onChange={this.handleSliderChange} />
        <TextField
          id="text-field-send-data"
          value={this.state.value}
          // disabled={!isPortOpen}
          style={styles.text}
          onChange={this.handleTextChange} />
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.send.buffer ? state.serialPortState.send.buffer : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(TextSlider)