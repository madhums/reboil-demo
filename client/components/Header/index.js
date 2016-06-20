
import React, { Component } from 'react'
import { appName } from '../../config'

class Header extends Component {
  render () {
    return (
      <div className="header clearfix">
        <h3 className="text-muted">{ appName }</h3>
      </div>
    )
  }
}

export default Header
