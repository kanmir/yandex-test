import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class Header extends Component {

  render = () => {
    return (
      <Menu color='black' attached className='navbar' inverted>
        <Menu.Item header>
          Шереметьево
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;