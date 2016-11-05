import React from 'react'
import AppBar from 'material-ui/AppBar';
import Settings from './settings.jsx'
import { connect } from 'react-redux'

class Navigation extends React.Component {
  portInfoString () {
    const { portInfo } = this.props
    return portInfo ? `${portInfo.portName} (${portInfo.baudrate} bps)` : 'not connected';
  }
  render () {
    return (
      <div>
        <AppBar
          title={<span>{this.portInfoString()}</span>}
          showMenuIconButton={false}
          iconElementRight={<Settings />} />
      </div>
    )
  }
}

export default connect((state/*, props*/) => {
  return {
    portInfo: state.serialPortState.port.info
  }
})(Navigation)