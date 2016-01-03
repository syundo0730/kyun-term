import React from 'react'
import { render } from 'react-dom'
import createStore from './create-store'
import Application from './application.jsx'

const store = createStore()

render(
  <Application store={store} />,
  document.getElementById('app-wrapper')
)
