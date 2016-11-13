import React from 'react'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'

const LOG_BUFFER_SIZE = 1000
const styles = {
  sendData: {
    color: 'rgb(0, 188, 212)'
  },
  checkbox: {
    margin: 16,
    width: 150
  },
  toolbar: {
  },
  text: {
  }
};

class TextView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: {
        index: 0,
        value: 1
      },
      showSend: false
    }
    this.handleTypeChange = (event, index, value) => {
      this.setState({
        type: {
          index,
          value
        }
      })
    }
    this.handleShowSendChange = (event, isInputChecked) => {
      this.setState({
        showSend: isInputChecked
      })
    }
  }
  getLogText() {
    const { log } = this.props
    const { showSend, type } = this.state
    let logTexts = []
    for (let i = 0, len = log; i < log.length; ++i) {
      if (i > LOG_BUFFER_SIZE) {
        break
      }
      const _log = log[i]
      let receivedDataText, sendDataText
      if (type.index === 0) {
        if (_log.receivedData) {
          receivedDataText = _log.receivedData.toString('utf8')
        }
        if (_log.sendData && showSend) {
          sendDataText = _log.sendData
        }
      } else {
        const toIntegerExpression = (src) => (
          src.reduce((acc, data, index) => {
            if (type.index === 1) {
              return `${acc}${index === 0 ? '' : ' :'} 0x${data.toString(16)}`
            } else {
              return `${acc}${index === 0 ? '' : ' :'} ${data}`
            }
          }, '')
        )
        if (_log.receivedData) {
          receivedDataText = toIntegerExpression(_log.receivedData)
        }
        if (_log.sendData && showSend) {
          sendDataText = toIntegerExpression(_log.sendData)
        }
      }
      if (receivedDataText) {
        logTexts.push(
          <p key={`received_${i}`}>{receivedDataText}</p>
        )
      }
      if (sendDataText) {
        logTexts.push(
          <p key={`send_${i}`} style={styles.sendData}>{`> ${sendDataText}`}</p>
        )
      }
    }
    return logTexts
  }
  render() {
    return (
      <div>
        <CardActions>
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup firstChild={true}>
              <Checkbox
                checkedIcon={<Visibility />}
                uncheckedIcon={<VisibilityOff />}
                label="Send data"
                checked={this.state.showSend}
                onCheck={this.handleShowSendChange}
                style={styles.checkbox}/>
              <DropDownMenu value={this.state.type.value} onChange={this.handleTypeChange}>
                <MenuItem value={1} primaryText="Utf8" />
                <MenuItem value={2} primaryText="Hex" />
                <MenuItem value={3} primaryText="Dec" />
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
        </CardActions>
        <CardText style={styles.text}>
          {this.getLogText()}
        </CardText>
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  return {
    log: state.serialPortState.log
  }
})(TextView)