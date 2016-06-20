
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Loader from '../Loader'
import Article from '../Article'
import { fetchArticles } from '../../actions'

class Articles extends Component {
  render () {
    return (
      <section className="articles">
        <ul className="list-unstyled">
          {this.props.items.map((entity, i) =>
            <li key={i}>
              <Article item={entity} />
            </li>
          )}
        </ul>
      </section>
    )
  }
}

Articles.propTypes = {
  items: PropTypes.array
}

class Home extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchArticles())
  }

  render () {
    const { isFetching, articles } = this.props
    const homeClass = classNames('home', { hidden: isFetching })
    return (
      <div>
        <Loader loading={isFetching} />
        <div className={homeClass}>
          <Articles items={articles} />
        </div>
      </div>
    )
  }
}

function mergeStateToProps (state) {
  const {
    isFetching,
    articles,
    pages,
    page
  } = state.articles
  return {
    isFetching,
    articles,
    pages,
    page
  }
}

export default connect(mergeStateToProps)(Home)
