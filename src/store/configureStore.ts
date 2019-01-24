import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
// @ts-ignore
import { multiClientMiddleware } from 'redux-axios-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import humps from 'humps';
import qs from 'qs';

import rootReducer from '../reducers';

const initialState = {};

export function configureStore(state = initialState) {
  const paramsSerializer = (params: object) =>
    qs.stringify(humps.decamelizeKeys(params), { arrayFormat: 'indices' });

  return createStore(
    rootReducer,
    state,
    composeWithDevTools(
      applyMiddleware(
        multiClientMiddleware({
          default: {
            client: axios.create({
              // @ts-ignore
              transformRequest: axios.defaults.transformRequest.concat((json: string) =>
                JSON.stringify(humps.decamelizeKeys(JSON.parse(json || '{}'))),
              ),
              // @ts-ignore
              transformResponse: axios.defaults.transformResponse.concat(
                humps.camelizeKeys,
              ),
              paramsSerializer,
            }),
          },
        }),
      ),
    ),
  );
}

export default configureStore;
