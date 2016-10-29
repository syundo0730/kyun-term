import React from 'react'
import { Card as OriginalCard, CardActions, CardHeader, CardText } from 'material-ui/Card';

export default class Card extends React.Component {
  render () {
    return (
      <div>
        <OriginalCard>
          <CardHeader title={this.props.title} />
          <CardText>
            {this.props.children}
          </CardText>
        </OriginalCard>
      </div>
    )
  }
}