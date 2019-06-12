import React from 'react';
import Flight from './Flight';
import Loader from './Loader';

class FlightContainer extends React.Component {
  render = () => {
    const { flights, loading } = this.props;
    if (loading) return <Loader />;
    if (!flights || !flights.length) {
      return 'Ничего не найдено!'
    }
    return flights.map(flight => <Flight key={flight.id} flight={flight} />);
  };
}

export default FlightContainer;