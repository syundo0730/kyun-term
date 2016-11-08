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
    width: '70%'
  },
  text: {
    width: 100
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
      value = this.validateRange(value)
      this.setState({ value });
      onChange(value)
    }
    this.handleTextChange = (event, value) => {
      let integerValue = 0
      if (value) {
        integerValue = this.validateRange(parseInt(value, 10))
      }
      this.setState({ value: integerValue });
      onChange(integerValue)
    }
  }
  validateRange(value) {
    const { min, max } = this.props.valueRange
    if (value > max) {
      return max
    } else if (value < min) {
      return min
    }
    return value
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
          // disabled={!isPortOpen
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