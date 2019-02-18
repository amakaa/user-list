import React, { Component } from 'react';
import MenuContainer from '../MenuContainer/MenuContainer.jsx';
import { PrivateRoute } from '../../router/redirect.js';

class App extends Component {
  render() {
    const { match, location } = this.props;

    return (
      <div className="App">
        <MenuContainer />
        {match && match.isExact && (
          <PrivateRoute location={location} pathname="/users" />
        )}
      </div> 
    );
  }
}

export default App;
