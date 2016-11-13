import React from 'react'
import { connect } from 'react-redux'
import { CardActions, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton';
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import { LineChart } from 'react-d3-components'
import RegExpService from '../../domain/regexp-service'

const styles = {
  toolbar: {
    title: {
      fontSize: 15
    }
  }
}
const defaultGraphData = [
  { values: [{ x: 0, y: 0 }] }
]
class GraphView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      separator: ',',
      data: [],
      lastIndex: 0
    }
    this.handleClear = () => {
      this.setState({
        data: [],
        lastIndex: 0
      })
    }
    this.handleSeparatorChange = (event) => {
      this.setState({
        separator: event.target.value,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { receivedData } = this.props
    const nextReceivedData = nextProps.receivedData
    if (receivedData !== nextReceivedData) {
      const str = nextReceivedData.toString()
      const values = RegExpService.splitStringAsFloat(this.state.separator, str)
      this.setState(
        this.reduceGraphData(this.state, values)
      )
    }
  }
  reduceGraphData(state, receivedDataArray) {
    const data = receivedDataArray.map((val, i) => {
      return {
        label: `lavel_${i}`,
        values: [
          ...(state.data[i] ? state.data[i].values : []),
          { x: state.lastIndex + 1, y: val }
          ]
      }
    })
    return { data: data, lastIndex: this.state.lastIndex + 1 }
  }
  render() {
    return (
      <div>
        <CardActions>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <FlatButton
                label='Clear'
                onTouchTap={this.handleClear} />
              <ToolbarTitle text='Separator' style={styles.toolbar.title}/>
              <TextField
                id='text-field-service'
                hintText='Strings used for data separator'
                value={this.state.separator}
                onChange={this.handleSeparatorChange} />
            </ToolbarGroup>
          </Toolbar>
        </CardActions>
        <CardText>
          <LineChart
            data={this.state.data.length > 0 ? this.state.data : defaultGraphData}
            width={700}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            xAxis={{innerTickSize: 6, label: "time"}}
            yAxis={{label: "val"}}
            shapeColor={"red"} />
        </CardText>
      </div>
    );
  }
}

export default connect((state/*, props*/) => {
  const receivedData = state.serialPortState.read.receivedData
  return {
    receivedData: receivedData ? receivedData : []
  }
})(GraphView)