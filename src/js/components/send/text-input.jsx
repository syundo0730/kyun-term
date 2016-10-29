import React from 'react'
import TextField from 'material-ui/TextField'

export default class TextInput extends React.Component {
  render() {
    return (
      <div>
        <TextField
          multiLine={true}
          fullWidth={true} />
      </div>
    );
  }
}