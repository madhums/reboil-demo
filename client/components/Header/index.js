
import React, { Component } from 'react'
import { appName } from '../../config'

class Header extends Component {
  render () {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              {appName}
            </a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right"></ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
