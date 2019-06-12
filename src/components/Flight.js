import React from 'react';
import { Segment, Grid, Header, List, Message, Icon, Label } from 'semantic-ui-react';

class Flight extends React.Component {

  isDelayed = () => {
    const { flight } = this.props;
    if (flight.delayTime && flight.delayTime > flight.time) {
      return true;
    }
    return false;
  };

  renderAircraft = () => {
    const { flight } = this.props;
    if (!flight || !flight.aircraft) return '';
    const labelOptions = {
      style: { marginLeft: 0 }
    };
    if (flight.aircraft.toLowerCase().includes('Sukhoi'.toLowerCase())) {
      labelOptions.color = 'red';
    }
    return (
      <Label basic {...labelOptions}>
        {flight.aircraft}
      </Label>
    );

  };

  renderTime = () => {
    const { flight } = this.props;
    if (!this.isDelayed()) {
      return flight.timeText;
    }
    return (
      <p>
        <del>{flight.timeText}</del>
        <br />
        <span className='red'>
          {flight.delayTime.slice(11, 16)}
        </span>
      </p>
    );
  };

  render = () => {
    const { flight } = this.props;
    if (!flight) return;
    const segmentOptions = {};
    if (this.isDelayed()) {
      segmentOptions.attached = 'top';
    }
    return (
      <>
        <Segment {...segmentOptions}>
          <Grid>
            <Grid.Row>
              <Grid.Column computer={6} mobile={16} style={{ marginBottom: '15px' }}>
                <Header as='h2'>
                  <Header.Content>
                    {flight.city}
                  </Header.Content>
                  <Header.Subheader>
                    {this.renderTime()}
                  </Header.Subheader>
                </Header>
                {this.renderAircraft()}
              </Grid.Column>
              <Grid.Column computer={3} mobile={6}>
                <List>
                  {flight.numbers.map(number => <List.Item key={number}>{number}</List.Item>)}
                </List>
              </Grid.Column>
              <Grid.Column computer={3} mobile={4}>
                {`${flight.term} ${flight.gate}`}
              </Grid.Column>
              <Grid.Column computer={4} mobile={6}>
                <Header as='h4'>
                  {flight.status}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {
          this.isDelayed() &&
          <Message warning attached='bottom'>
            <Icon name='warning' />
            Рейс задержан!
          </Message>
        }
      </>
    );
  }
}

export default Flight;