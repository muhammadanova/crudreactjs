import React from 'react'
// Core Component
import Header from './layout/Header.jsx'
// Index Page
import Home from './page/Home.jsx'

class Index extends React.Component {
  state = {}
  render(){
    return (
      <>
        <Header />
        <div className="container">
          <Home />
        </div>
      </>
    )
  }
}

export default Index;