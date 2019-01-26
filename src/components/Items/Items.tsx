import React, { Component } from 'react';
import _ from 'lodash';
import produce from 'immer';

import { Action, DispatchedAction } from '../../actions';
import { ItemsState, Item } from '../../reducers/items';
import ItemComponent from './Item';

interface Props {
  items: ItemsState;
  receiveItems: DispatchedAction;
}

interface State {
  items: ItemsState;
}

export const MAX_SUM = 100;

class Items extends Component<Props, State> {
  state = { items: this.props.items };

  componentDidMount() {
    (this.props.receiveItems(3) as Promise<Action>).then(() => {
      this.setState(this.autocorrected);
    });
  }

  get autocorrected() {
    const { items } = this.props;
    const difference = MAX_SUM - _.sumBy(items, 'percent');
    const nextItems = produce(items, (draft) => {
      if (items.length > 1) {
        const willChanged = (difference > 0 ? _.minBy : _.maxBy)(items, 'percent');
        (willChanged as Item).percent += difference;
      }
    });
    return { items: nextItems };
  }

  itemsExcept = (item: Item): ItemsState => {
    const { items } = this.state;
    return _.difference(items, [item]);
  }

  handleItemChange = (index: number) => (percent: number) => {
    const { items } = this.state;
    const nextItems = produce(items, (draft) => {
      draft[index].percent = percent;
      if (items.length > 1) {
        const current = items[index];
        const difference = percent - current.percent;
        const dependantIndex = items.indexOf(
          (difference > 0 ? _.maxBy : _.minBy)(
            this.itemsExcept(current), 'percent',
          ) || items[0],
        );
        draft[dependantIndex].percent -= difference;
      }
    });
    this.setState({ items: nextItems });
  }

  render() {
    const { items } = this.state;
    if (!items) { return null; }
    return (
      <div>
        { items.map((item, index) => {
          const max = (_.maxBy(this.itemsExcept(item), 'percent') as Item).percent + item.percent;
          return <ItemComponent
            key={index}
            item={item}
            max={max}
            onChange={this.handleItemChange(index)}
          />;
        })}
      </div>
    );
  }
}

export default Items;
