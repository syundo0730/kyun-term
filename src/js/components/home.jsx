import React from 'react'
import Navigation from './navigation/index.jsx'
import Receive from './receive/index.jsx'
import Send from './send/index.jsx'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Navigation />
        <Send />
        <Receive />
      </div>
    )
  }
}