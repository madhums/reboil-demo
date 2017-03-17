
import createBrowserHistory from 'history/createBrowserHistory';
import { getQuery } from './query-params';

const history = createBrowserHistory();
export default history;

// add query property to location object
// ReactRouter stopped doing it in v4
// https://github.com/ReactTraining/react-router/issues/4410

history.listen(addQueryObject);

function addQueryObject () {
  history.location = Object.assign(history.location, { query: getQuery(history.location) });
}

addQueryObject();
