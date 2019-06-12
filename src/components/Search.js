import React from 'react';
import { Form } from 'semantic-ui-react';

class Search extends React.Component {

  state = {
    searchTerm: ''
  };

  onFormSubmit = () => {
    this.props.onSubmit(this.state.searchTerm);
  };

  onInputChange = (e, { value }) => {
    this.setState({ searchTerm: value });
  };

  clearInput = async () => {
    await this.setState({ searchTerm: '' });
    this.onFormSubmit();
  };

  render = () => {
    const { searchTerm } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Input
          onChange={this.onInputChange}
          onBlur={this.onFormSubmit}
          value={searchTerm}
          fluid
          placeholder='Поиск по номеру рейса, городу или авиакомпании'
          icon={searchTerm ? {
            name: 'times',
            link: true,
            onClick: this.clearInput
          } : null
          }
        />
      </Form>
    );
  };
}

export default Search;