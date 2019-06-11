import React from 'react';
import { Button } from 'semantic-ui-react';

class FlightType extends React.Component {

  render = () => {
    const { type } = this.props;
    return (
      <Button.Group className='flight-type'>
        <Button
          positive={type === 'departure'}
          onClick={() => {
            this.props.onTypeChange('departure')
          }}
        >
          Вылет
        </Button>
        <Button.Or text='|' />
        <Button
          positive={type === 'arrival'}
          onClick={() => {
            this.props.onTypeChange('arrival')
          }}
        >Прилет</Button>
      </Button.Group>
    );
  }
}

export default FlightType;