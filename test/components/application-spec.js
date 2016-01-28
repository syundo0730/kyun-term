import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Application from '../../src/js/components/application'
import { Provider } from 'react-redux'
import Home from '../../src/js/components/home'

function setup() {
  let store = {}
  let renderer = TestUtils.createRenderer()
  renderer.render(<Application store = { store } />)
  let output = renderer.getRenderOutput()

  return {
    output,
    renderer
  }
}

describe('components', () => {
  describe('Application', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe(Provider)

      let home = output.props.children
      expect(home.type).toBe(Home)
    })
  })
})
