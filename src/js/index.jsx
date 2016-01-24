import { render } from 'react-dom'
import createStore from './store/create-store'
import Application from './components/application.jsx'

const store = createStore()

render(
  <Application store={store} />,
  document.getElementById('app-wrapper')
)
