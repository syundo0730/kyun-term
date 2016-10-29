import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class Settings extends React.Component {
  handleOpen() {
    // this.setState({open: true});
  }

  handleClose() {
    // this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label={'Connect'}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose} />
    ]
    return (
      <div>
        <IconButton
        touch={true}
        onTouchTap={this.handleOpen}>
          <ActionSettings />
        </IconButton>
        <Dialog
          title='Settings'
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose} >
          <SelectField
            floatingLabelText='Port'
            value={1}
            onChange={this.handleChange}>
              <MenuItem value={1} primaryText='Never' />
              <MenuItem value={2} primaryText='Every Night' />
              <MenuItem value={3} primaryText='Weeknights' />
              <MenuItem value={4} primaryText='Weekends' />
              <MenuItem value={5} primaryText='Weekly' />
          </SelectField>
          <SelectField
            floatingLabelText='Frequency'
            value={2}
            onChange={this.handleChange}>
              <MenuItem value={1} primaryText='Never' />
              <MenuItem value={2} primaryText='Every Night' />
              <MenuItem value={3} primaryText='Weeknights' />
              <MenuItem value={4} primaryText='Weekends' />
              <MenuItem value={5} primaryText='Weekly' />
          </SelectField>
        </Dialog>
      </div>
    );
  }
}