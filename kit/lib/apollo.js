import { PropTypes } from 'react'

import {
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'

import { APOLLO } from 'config/project'

import {
  TOKEN
} from 'app/utils/consts'

const networkInterface = createNetworkInterface({
  uri: APOLLO[`uri-${process.env.NODE_ENV}`],
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = window.DB.getItem(TOKEN)
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  },
}]);

function createClient(interfaceType, opt = {}) {
  return new ApolloClient(Object.assign({
    reduxRootSelector: state => state.apollo,
    networkInterface: interfaceType,
  }, opt));
}

export function mergeData(toMerge) {
  return PropTypes.shape(Object.assign({
    loading: PropTypes.bool.isRequired,
  }, toMerge)).isRequired;
}

export function browserClient() {
  return createClient(networkInterface);
}
