import React from 'react'

export default class TextView extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}