import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { appName } from '../../config';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              {appName}
            </Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right" />
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
