import React from 'react'
import TextView from './text-view.jsx'
import GraphView from './graph-view.jsx'
import { Card, CardHeader } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs'
import EditorShortText from 'material-ui/svg-icons/editor/short-text'
import EditorShowChart from 'material-ui/svg-icons/editor/show-chart'

export default class Receive extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader title='Received Data' />
        <Tabs>
          <Tab icon={<EditorShortText />}>
            <TextView />
          </Tab>
          <Tab icon={<EditorShowChart />}>
            <GraphView />
          </Tab>
        </Tabs>
      </Card>
    )
  }
}