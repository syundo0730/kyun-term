import React from 'react'
import TextView from './text-view.jsx'
import Card from '../common/card.jsx'

export default class Receive extends React.Component {
  render () {
    return (
      <div>
        <Card title='Received Data'>
				  <TextView />
        </Card>
      </div>
    )
  }
}