
import React, { Component } from 'react'
import Header from '../components/Header'
import Routes from './Routes';

class App extends Component {
  render () {
    return (
      <div className="container">
        <Header />
        <Routes />
      </div>
    )
  }
}

export default App
