import React from 'react'
// Core Component
import Header from './layout/Header.jsx'
// Index Page
import Employee from './page/Employees.jsx'

class Employees extends React.Component {
  state = {}
  render(){
    return (
      <>
        <Header />
        <div className="container">
          <Employee />
        </div>
      </>
    )
  }
}

export default Employees;