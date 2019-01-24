export const RECEIVE_ITEMS_ACTION_TYPES = [
  'RECEIVE_ITEMS_REQUEST',
  'RECEIVE_ITEMS_SUCCESS',
];

export function receiveItems(count: number) {
  return {
    types: RECEIVE_ITEMS_ACTION_TYPES,
    payload: {
      request: {
        url: `/items/${count}.json`,
      },
    },
  };
}