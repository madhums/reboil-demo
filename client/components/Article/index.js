
import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class Article extends Component {
  render () {
    const article = this.props.item
    return (
      <div className="article">
        <Link to={`/articles/${article._id}`}>{article.title}</Link>
        <div className="body">{article.body}</div>
      </div>
    )
  }
}

Article.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  })
}

export default Article
