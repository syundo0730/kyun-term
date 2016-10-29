import React from 'react'
import AppBar from 'material-ui/AppBar';
import Settings from './settings.jsx'

export default class Navigation extends React.Component {
  render () {
    return (
      <div>
        <AppBar
          title={<span></span>}
          showMenuIconButton={false}
          iconElementRight={<Settings />} />
      </div>
    )
  }
}