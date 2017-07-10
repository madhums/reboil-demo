import createBrowserHistory from 'history/createBrowserHistory';
import qs from 'qs';

const history = createBrowserHistory();
export default history;

// add query property to location object
// ReactRouter stopped doing it in v4
// https://github.com/ReactTraining/react-router/issues/4410

history.listen(addQueryObject);

function addQueryObject() {
  history.location = Object.assign(history.location, {
    query: qs.parse(window.location.search.slice(1))
  });
}

addQueryObject();
