import React from 'react'
import ReactDOM from 'react-dom'
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
import { scaleLinear } from 'd3-scale'

const styles = {
  toolbar: {
    title: {
      fontSize: 15
    },
    textField: {
      width: 50
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
      lastIndex: 0,
      xScaleRangeMax: 100,
      xScaleRange: [0, 100],
      width: 400
    }
    this.handleClear = () => {
      this.setState({
        data: [],
        lastIndex: 0,
        xScaleRange: [0, this.state.xScaleRangeMax]
      })
    }
    this.handleSeparatorChange = (event) => {
      this.setState({
        separator: event.target.value
      })
    }
    this.handleXScaleRangeChange = (event) => {
      const xScaleRangeMax = event.target.value
      this.setState({
        xScaleRangeMax,
        xScaleRange: this.calcRange(
          this.state.lastIndex,
          xScaleRangeMax
        )
      })
    }
    this.handleWindowSizeChange = () => {
      const width = ReactDOM.findDOMNode(this.chartArea).offsetWidth - 50
      if (width > 0) {
        this.setState({ width })
      }
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange)
  }
  componentWillReceiveProps(nextProps) {
    const { receivedData } = this.props
    const nextReceivedData = nextProps.receivedData
    if (receivedData !== nextReceivedData) {
      const data = nextReceivedData.toString()
      const dataArray = RegExpService.splitStringAsFloat(this.state.separator, data)
      this.setState(
        this.reduceGraphData(this.state, dataArray)
      )
    }
  }
  reduceGraphData(state, dataArray) {
    const { data, lastIndex, xScaleRangeMax } = state
    const newIndex = lastIndex + 1
    const newData = dataArray.map((val, i) => ({
      label: `lavel_${i}`,
      values: [
        ...(data[i] ? data[i].values : []),
        { x: newIndex, y: val }
      ]
    }))
    return {
      data: newData,
      lastIndex: newIndex,
      xScaleRange: this.calcRange(newIndex, xScaleRangeMax)
    }
  }
  calcRange(lastIndex, xScaleRangeMax) {
    if (0 <= lastIndex && lastIndex <= xScaleRangeMax) {
      return [0, xScaleRangeMax]
    } else {
      return [lastIndex - xScaleRangeMax, lastIndex]
    }
  }
  render() {
    const { data, separator, xScaleRange, xScaleRangeMax, width } = this.state
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
                id='separator-text-field'
                hintText='Strings used for data separator'
                value={separator}
                onChange={this.handleSeparatorChange}
                style={styles.toolbar.textField} />
              <ToolbarTitle text='Buffer Size' style={styles.toolbar.title}/>
              <TextField
                id='x-scale-range-text-field'
                value={xScaleRangeMax}
                onChange={this.handleXScaleRangeChange}
                style={styles.toolbar.textField} />
            </ToolbarGroup>
          </Toolbar>
        </CardActions>
        <CardText ref={(chartArea) => { this.chartArea = chartArea }}>
          <LineChart
            data={data.length > 0 ? data : defaultGraphData}
            width={width}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            xAxis={{innerTickSize: 6, label: 'time'}}
            xScale={scaleLinear().domain(xScaleRange).range([0, width-100])}
            yAxis={{label: 'val'}}
            shapeColor={'red'} />
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