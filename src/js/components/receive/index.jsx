import React from 'react'
import TextView from './text-view.jsx'
import { Card, CardHeader } from 'material-ui/Card';

export default class Receive extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader title='Received Data' />
        <TextView />
      </Card>
    )
  }
}