import { AnyAction, combineReducers } from 'redux';

import items, { ItemsState } from './items';

export interface ApplicationState {
  items: ItemsState;
}

const rootReducer = combineReducers({
  items,
} as any);

export default rootReducer;
