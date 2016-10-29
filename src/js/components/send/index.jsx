import React from 'react'
import TextInput from './text-input.jsx'
import Card from '../common/card.jsx'
import RaisedButton from 'material-ui/RaisedButton'

export default class Send extends React.Component {
  render () {
    return (
      <div>
        <Card title='Send Data'>
				  <TextInput />
          <RaisedButton label='Send' primary={true} />
        </Card>
      </div>
    )
  }
}