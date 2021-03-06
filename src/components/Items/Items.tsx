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
    this.receive(2)();
  }

  receive = (count: number)=> ()=> {
    (this.props.receiveItems(count) as Promise<Action>).then(() => {
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

  limitMaxForItem = (item: Item) => {
    return this.props.items.length === 1 ?
      100 :
      (_.maxBy(this.itemsExcept(item), 'percent') as Item).percent + item.percent;
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
        draft[dependantIndex].percent = _.round(draft[dependantIndex].percent, 2);
      }
    });
    this.setState({ items: nextItems });
  }

  render() {
    const { items } = this.state;
    if (!items) { return null; }
    return (
      <div>
        <div>
          {_.range(1, 6).map((i: number) => {
            return <button key={i} onClick={this.receive(i)}>{i} item</button>;
          })}
        </div>
        { items.map((item, index) => {
          return <ItemComponent
            key={index}
            item={item}
            max={this.limitMaxForItem(item)}
            onChange={this.handleItemChange(index)}
          />;
        })}
        <div>
          Результат:
          {items.map((item, index) => {
            return <div key={index}>{item.name}: {item.percent}%</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Items;
