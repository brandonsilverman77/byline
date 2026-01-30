import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import API from "Connection/api";

function fetchQuery(
  operation,
  variables,
) {
  return API.graphQL({
    query: operation.text,
    variables,
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),  
});

export default environment;