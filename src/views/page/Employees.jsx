import React from 'react'
import axios from 'axios'
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';

class Employees extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      employees: [],
      ModalAddEmployees: false
    }
  }

  componentDidMount(){
    this.getEmployees()
  }

  getEmployees = () => {
    axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
    .then(res => {
      const employees = res.data
      console.log(res.data)
      this.setState({ employees })
    })
  }

  showModal = () => {
    this.setState({ ModalAddEmployees : true })
  }

  hideModal = () => {
    this.setState({ ModalAddEmployees : false })
  }

  render(){
    return(
      <section className="mt-5 mb-5">
        <Modal
          size="lg"
          centered
          show={this.state.ModalAddEmployees}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Add Employees
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={this.hideModal}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <div className="modal-body">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.name} placeholder="Your Name" onChange={this.getName} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={this.state.email} placeholder="Your Email" onChange={this.getEmail}/>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={this.state.phone} placeholder="Your Phone" onChange={this.getPhone}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" value={this.state.city} placeholder="Your City" onChange={this.getCity}/>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <Button variant="primary" type="submit" size="sm">Submit</Button>
              <Button variant="secondary" type="button" size="sm" onClick={this.hideModal}>Cancel</Button>
            </div>
          </Form>
        </Modal>
        <Button
          size="sm"
          className="mb-3"
          variant="primary"
          type="button"
          onClick={this.showModal}
        >
          <i className="fa fa-plus"></i>&nbsp;Add Employees
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Age</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.employees.map((employee, index) => {
                return (
                  <tr key={employee.id}>
                    <td>{index + 1}</td>
                    <td>{employee.employee_age}</td>
                    <td>{employee.employee_name}</td>
                    <td>{employee.employee_salary}</td>
                    <td>
                      <Button variant="info" size="sm" className="mr-2">
                        <i className="fa fa-pencil"></i>&nbsp;Edit
                      </Button>
                      <Button variant="danger" size="sm" className="mr-2">
                        <i className="fa fa-trash"></i>&nbsp;Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </section>
    )
  }
}

export default Employees;