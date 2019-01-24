import React, { Component } from 'react';

import { ItemsState } from '../../reducers/items';
import { receiveItems } from '../../actions/items';

interface ItemsProps {
  items: ItemsState;
  receiveItems: typeof receiveItems;
}

class Items extends Component<ItemsProps> {
  componentDidMount() {
    this.props.receiveItems(1);
  }

  render() {
    return (
      <div>
        Items work
      </div>
    );
  }
}

export default Items;
