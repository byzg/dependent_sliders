import React, { Component } from 'react';
import _ from 'lodash';
import InputRange, { Range } from 'react-input-range';

import 'rc-input-number/assets/index.css';
import 'react-input-range/lib/css/index.css';

import { Item } from '../../reducers/items';
import { Wrapper, Name, InputNumberStyled } from './styled/Item';

interface Props {
  item: Item;
  max: number;
  onChange: (value: number) => void;
}

class ItemComponent extends Component<Props> {
  separatorTyping = '';

  handleKeyDown = (event: React.KeyboardEvent) => {
    const { item: { percent } } = this.props;
    this.separatorTyping = [',', '.'].includes(event.key) && Number.isInteger(percent) ? '.' : '';
  }

  formatter = (value: number|string): string=> {
    return `${_.round(parseFloat(value as string), 2)}${this.separatorTyping}`;
  }

  parser = (newValue: string): number=> {
    const { item: { percent }, max } = this.props;
    const parsed = parseFloat((newValue.match(/[\d\.]+/g) || []).join('')) || 0;
    return parsed > max || parsed < 0 ? percent : parsed;
  }

  handleChange = (value: number | Range)=> {
    this.props.onChange(_.round(value as number, 2));
  }

  render() {
    const { item, max } = this.props;
    return (
      <Wrapper>
        <Name>{item.name}</Name>
        <InputRange
          maxValue={_.round(max, 2)}
          minValue={0}
          value={parseFloat(this.formatter(item.percent))}
          onChange={this.handleChange}
        />
        <InputNumberStyled
          value={item.percent}
          formatter={this.formatter}
          parser={this.parser}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </Wrapper>
    );
  }
}

export default ItemComponent;
