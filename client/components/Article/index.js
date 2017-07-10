import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

function Article(props) {
  const { _id, title, body } = props;
  return (
    <div className="article">
      <Link to={`/articles/${_id}`}>
        {title}
      </Link>
      <div className="body">
        {body}
      </div>
    </div>
  );
}

Article.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })
};

export default Article;
