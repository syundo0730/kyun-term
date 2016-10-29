import React from 'react'
import AppBar from 'material-ui/AppBar';
import Settings from './settings.jsx'
import { connect } from 'react-redux'

class Navigation extends React.Component {
  portInfoString () {
    const { port } = this.props
    return port.info ? 'connected' : 'not connected';
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
    port: state.serialPortState.port,
  }
})(Navigation)