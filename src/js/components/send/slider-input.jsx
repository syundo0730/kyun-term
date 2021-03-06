import React from 'react'
import { connect } from 'react-redux'
import { setSendBuffer, send } from '../../actions/action-creators'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextSlider from './text-slider.jsx'
import * as Types from '../../domain/value-types'

const styles = {
  root: {
    height: 120
  }
}
class SliderInput extends React.Component {
  constructor(props) {
    super(props)
    this.typeEntities = [
      new Types.String(),
      new Types.Uint8(),
      new Types.Int8(),
      new Types.Uint16(),
      new Types.Int16(),
      new Types.Uint32(),
      new Types.Int32()
    ]
    this.state = {
      type: {
        index: 0,
        value: 1
      },
      range: this.typeEntities[0].Range,
      sliderValue: 0
    }
    this.handleSliderChange = (value) => {
      const sendBuffer = this.typeEntities[this.state.type.index].convertToUint8Array(value)
      this.props.dispatch(setSendBuffer(sendBuffer))
      const { sendOnChange } = this.props
      if (sendOnChange) {
        this.props.dispatch(send(sendBuffer))
      }
    }
    this.handleTypeChange = (event, index, value) => {
      const range = this.typeEntities[index].Range
      this.setState({
        type: {
          index,
          value
        },
        range
      })
    }
  }
  render() {
    const { isPortOpen } = this.props
    const menuItems = [
      'utf8', 'uint8', 'int8', 'uint16', 'int16', 'uint32', 'int32'
      ].map((name, i) => (<MenuItem value={i+1} primaryText={name} key={i}/>))
    return (
      <div style={styles.root}>
        <DropDownMenu
        value={this.state.type.value}
        onChange={this.handleTypeChange}
        disabled={!isPortOpen}>
          {menuItems}
        </DropDownMenu>
        <TextSlider
          onChange={this.handleSliderChange}
          valueRange={Object.assign(this.state.range, {step: 1})}
          disabled={!isPortOpen} />
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    isPortOpen: !!state.serialPortState.port.info
  }
})(SliderInput)