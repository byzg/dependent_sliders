import React, { Component } from 'react';

import Items from '../../containers/ItemsContainer';
import { Wrapper } from './styled';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Items />
      </Wrapper>
    );
  }
}

export default App;
