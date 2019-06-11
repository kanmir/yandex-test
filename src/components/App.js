import React from 'react';
import '../css/App.css';
import FlightType from './FlightType';
import FlightsContainer from './FlightsContainer';
import Search from './Search';
import { Container, Grid, Button } from 'semantic-ui-react';
import { get } from '../helpers/fetch';
import { transformFlights } from '../helpers/flight';
import Header from './Header';

class App extends React.Component {

  state = {
    type: 'departure',
    searchTerm: '',
    flights: [],
    loading: true,
    btnLoading: false,
    startDate: Date.now() + 2 * 60 * 60 * 1000,
    endDate: Date.now() + 3 * 60 * 60 * 1000
  };

  prepareUrl = (searchTerm) => {
    const baseUrl = 'https://www.svo.aero/bitrix/timetable/';
    const { type } = this.state;
    let from = new Date(this.state.startDate).toISOString().slice(0, 14) + '00';
    let to = new Date(this.state.endDate).toISOString().slice(0, 14) + '59';
    let search = '';
    if (searchTerm) {
      search = 'search=' + encodeURI(searchTerm);
      from = from.slice(0, -5) + '00:00';
      to = to.slice(0, -5) + '23:59';
    }
    const dateEnd = `dateEnd=${to}`;
    const dateStart = `dateStart=${from}`;
    const flightDirection = `direction=${type}`;
    return `${baseUrl}?${flightDirection}&${dateStart}&${dateEnd}&perPage=9999&page=0&&locale=ru&${search}`;
  };

  getFlights = async (url) => {
    const { type } = this.state;
    const response = await get(url);
    if (!response || !response.items) return;
    const flights = transformFlights(response.items, type);
    return flights;
  };

  loadMoreClick = async () => {
    await this.setState((prevState) => {
      return {
        btnLoading: true,
        startDate: prevState.startDate + 2 * 60 * 60 * 1000,
        endDate: prevState.endDate + 2 * 60 * 60 * 1000
      };
    });
    const url = this.prepareUrl();
    const flights = await this.getFlights(url);
    this.setState((prevState) => {
      return {
        btnLoading: false,
        flights: prevState.flights.concat(flights)
      }
    });
  };

  onTypeChange = async (type) => {
    await this.setState({
      type,
      startDate: Date.now() + 2 * 60 * 60 * 1000,
      endDate: Date.now() + 3 * 60 * 60 * 1000,
      loading: true,
      searchTerm: ''
    });
    const url = this.prepareUrl();
    const flights = await this.getFlights(url);
    this.setState({
      flights,
      loading: false
    });
  };

  onSearch = async (searchTerm) => {
    await this.setState({ loading: true });
    const url = this.prepareUrl(searchTerm);
    const flights = await this.getFlights(url);
    await this.setState({
      flights,
      loading: false,
      searchTerm
    });
  };

  componentDidMount = async () => {
    const url = this.prepareUrl();
    const flights = await this.getFlights(url);
    this.setState({
      flights,
      loading: false
    });
  };

  render = () => {
    const { type, flights, loading, btnLoading, searchTerm } = this.state;
    return (
      <>
        <Header />
        <Container>
          <Grid>
            <Grid.Row className='mb15'>
              <Grid.Column computer={4} mobile={16} />
              <Grid.Column computer={8} mobile={16}>
                <Search onSubmit={this.onSearch} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={4} mobile={16} textAlign='center'>
                <FlightType type={type} onTypeChange={type => this.onTypeChange(type)} />
              </Grid.Column>
              <Grid.Column computer={8} mobile={16}>
                <FlightsContainer type={type} flights={flights} loading={loading} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer={4} mobile={16} />
              <Grid.Column computer={8} mobile={16} textAlign='center'>
                {!searchTerm &&
                  <Button
                    content='Загрузить еще'
                    disabled={loading || btnLoading}
                    primary
                    onClick={() => this.loadMoreClick()}
                    loading={btnLoading}
                  />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}

export default App;