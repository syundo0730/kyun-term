import React from 'react'
import { connect } from 'react-redux'
import { setSendBuffer } from '../../actions/action-creators'
import TextSlider from './text-slider.jsx'

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

class SliderInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValueRange: {
        min: 0,
        max: 255,
        step: 1
      },
      sliderValue: 0,
    }
    this.handleSliderChange = (value) => {
      console.log(value)
    }
    this.handleTextChange = (event, value) => {
      this.setState({ sliderValue: value });
    }
  }
  render() {
    const { isPortOpen } = this.props
    return (
      <div>
        <TextSlider
          onChange={this.handleSliderChange}
          valueRange={{ min: 0, max: 255, step: 1 }}/>
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    sendBuffer: state.serialPortState.send.buffer ? state.serialPortState.send.buffer : '',
    isPortOpen: !!state.serialPortState.port.info
  }
})(SliderInput)