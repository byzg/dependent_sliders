import { Action } from '../actions';
import { RECEIVE_ITEMS_ACTION_TYPES } from '../actions/items';

const [
  ,
  RECEIVE_ITEMS_SUCCESS,
] = RECEIVE_ITEMS_ACTION_TYPES;

export interface Item {
  name: string;
  percent: number;
}

export interface ItemsState {
  [index: number]: Item;
}

const initialState: ItemsState = [];

function items(state = initialState, action: Action) {
  switch (action.type) {
    case RECEIVE_ITEMS_SUCCESS: {
      return action.payload.data;
    }
    default:
      return state;
  }
}

export default items;
