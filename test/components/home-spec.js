import expect from 'expect'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-addons-test-utils'
import {Home} from '../../src/js/components/home'

function setup() {
  let props = {
    dispatch: sinon.spy(),
    list: {},
    port: {},
    send: {},
    read: {},
    reduxState: {}
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Home {...props}/>)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
  describe('Home', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('div')

      let [ serialStatus, portList, recievedData, openButton, sendButton, sendMultiButton, state ] = output.props.children

      expect(serialStatus.type).toBe('span')
      expect(portList.type).toBe('ol')
      expect(recievedData.type).toBe('div')
      expect(openButton.type).toBe('button')
      expect(sendButton.type).toBe('button')
      expect(sendMultiButton.type).toBe('button')
      expect(state.type).toBe('pre')
    })

    it('should call dispatch if openButton Clicked', () => {
      const { output, props } = setup()
      let openButon = output.props.children[3]
      openButon.props.onClick()
      expect(props.dispatch.called)
    })

    it('should call dispatch if sendButton Clicked', () => {
      const { output, props } = setup()
      let sendButon = output.props.children[4]
      sendButon.props.onClick()
      expect(props.dispatch.called)
    })

    it('should call dispatch if sendMultiButton Clicked', () => {
      const { output, props } = setup()
      let sendMultiButon = output.props.children[5]
      sendMultiButon.props.onClick()
      expect(props.dispatch.called)
    })
  })
})
