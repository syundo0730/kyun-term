import React from 'react'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from './home.jsx'
injectTapEventPlugin();

export default class Application extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        <MuiThemeProvider multiTheme={getMuiTheme()}>
          <Home />
        </MuiThemeProvider>
      </Provider>
    )
  }
}
