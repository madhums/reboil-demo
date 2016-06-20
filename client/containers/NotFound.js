
import React, { Component } from 'react'
import Header from '../components/Header'

class NotFound extends Component {
  render () {
    return (
      <div className="container">
        <Header />
        <section className="not-found">
          <em>The page you are looking for does not exist</em>
        </section>
      </div>
    )
  }
}

export default NotFound
