export interface Action {
  type: string;
  payload: {
    data: object,
  };
}

export interface PreAction {
  types: string[];
  payload: {
    request: object,
  };
}

// type Art = PreAction extends Promise<Action>;
export type DispatchedAction = (...args: any[]) => Promise<Action> | PreAction;
