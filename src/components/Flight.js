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
              <Grid.Column width={8}>
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
              <Grid.Column width={2}>
                <List>
                  {flight.numbers.map(number => <List.Item key={number}>{number}</List.Item>)}
                </List>
              </Grid.Column>
              <Grid.Column width={2}>
                {`${flight.term} ${flight.gate}`}
              </Grid.Column>
              <Grid.Column width={4}>
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