import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { baudrates } from '../../domain/port-config'
import { list, open, close } from '../../actions/action-creators'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      portSelect: { value: 0, index: -1 },
      baudrateSelect: { value: 0, index: -1 },
      buttonEnabled: false,
      buttonLabel: 'Connect'
    }
    this.handleOpen = () => {
      this.props.dispatch(list())
      this.setState({
        open: true,
        buttonLabel: this.props.isPortOpen ? 'Disconnect' : 'Connect'
      })
    }
    this.handleClose = () => {
      this.setState({ open: false })
    }
    this.handlePortChange = (event, index, value) => {
      this.setState({
        portSelect: { value, index },
        buttonEnabled: value > 0 && this.state.baudrateSelect.value > 0
      })
    }
    this.handleBaudrateChange = (event, index, value) => {
      this.setState({
        baudrateSelect: { value, index },
        buttonEnabled: value > 0 && this.state.portSelect.value > 0
      })
    }
    this.handleSubmit = () => {
      const { ports, isPortOpen } = this.props;
      if (isPortOpen) {
        this.props.dispatch(close())
      } else {
        const comName = ports[this.state.portSelect.index].comName
        const baudrate = baudrates[this.state.baudrateSelect.index]
        this.props.dispatch(open(comName, baudrate))
      }
      this.setState({ open: false })
    }
  }
  initialize() {
  }
  render() {
    const actions = [
      <FlatButton
        disabled={!this.state.buttonEnabled}
        label={this.state.buttonLabel}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    ]
    const { ports, isPortOpen } = this.props
    const portList = ports.map((port, index) => (
      <MenuItem value={index + 1} primaryText={port.comName} key={index} />
    ))
    const baudrateList = baudrates.map((rate, index) => (
      <MenuItem value={index + 1} primaryText={rate} key={index} />
    ))
    return (
      <div>
        <IconButton touch={true} onTouchTap={this.handleOpen}>
          <ActionSettings />
        </IconButton>
        <Dialog title='Settings' actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} >
          <SelectField
            floatingLabelText='Port'
            value={this.state.portSelect.value}
            onChange={this.handlePortChange}
            disabled={isPortOpen}>
            {portList}
          </SelectField>
          <SelectField
            floatingLabelText='Baudrate'
            value={this.state.baudrateSelect.value}
            onChange={this.handleBaudrateChange}
            disabled={isPortOpen}>
            {baudrateList}
          </SelectField>
        </Dialog>
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    ports: state.serialPortState.list.ports ? state.serialPortState.list.ports : [],
    isPortOpen: !!state.serialPortState.port.info
  }
})(Settings)