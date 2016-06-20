
import React, { PropTypes, Component } from 'react'

/**
 * <Loader loading={bool} text="Please wait..." />
 */

class Loader extends Component {
  render () {
    const { loading, text } = this.props
    if (!loading) return (<div></div>)
    return (
      <div className="loading">
        <i className="fa fa-spinner fa-spin"></i>
        &nbsp;
        {text || 'Loading...'}
      </div>
    )
  }
}

Loader.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string
}

export default Loader
