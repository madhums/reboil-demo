import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { fetchArticles } from 'actions/articles';
import Loader from 'components/Loader';
import Article from 'components/Article';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchArticles());
  }

  render() {
    const { loading, items } = this.props;
    const homeClass = classNames('home', { hidden: loading });
    return (
      <div>
        <Loader loading={loading} />
        <div className={homeClass}>
          <section className="articles">
            <ul className="list-unstyled">
              {items.map((item, i) =>
                <li key={i}>
                  <Article {...item} />
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function select(state) {
  return {
    ...state.articles
  };
}

export default connect(select)(Home);
