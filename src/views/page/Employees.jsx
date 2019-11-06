import React from 'react'
import axios from 'axios'
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';

class Employees extends React.Component {
  constructor(props){
    super(props);

    this.getName = this.getName.bind(this);
    this.getSalary = this.getSalary.bind(this);
    this.getAge = this.getAge.bind(this);

    this.state = {
      url: 'http://dummy.restapiexample.com/api/v1',
      employees: [],
      ModalAddEmployees: false,
      name: '',
      salary: '',
      age: ''
    }
  }

  componentDidMount(){
    this.getEmployees()
  }

  getName = e => { this.setState({ name : e.target.value }) }
  getSalary = e => { this.setState({ salary : e.target.value }) }
  getAge = e => { this.setState({ age: e.target.value }) }

  addEmployees = e => {
    e.preventDefault();

    let formData = {
      name: this.state.name,
      salary: this.state.salary,
      age: this.state.age,
    };

    axios.post(this.state.url + '/create', formData)
    .then(res => {
      this.state.employees.concat(res.data.payload)
      this.hideModal()
      this.setState({ name: '', salary: '', age: '' })
      this.getEmployees()
    })
    .catch(err => {
      console.log(err)
    })
  }

  editEmployess = (id, e) => {
    e.preventDefault();

    let formDataEdit = {
      name: '',
      salary: '',
      age: ''
    };

    axios.put('http://dummy.restapiexample.com/api/v1/update/'+id, formDataEdit)
    .then(res => {
      const result = res.data
      this.state.employees.concat(result)
      this.hideModal()
      this.setState({ name: '', salary: '', age: '' })
      this.getEmployees()
    })
    .catch(err => {
      console.log(err)
    })
  }

  getEmployees = () => {
    axios.get(this.state.url + '/employees')
    .then(res => {
      const arrEmployees = res.data
      const employees = arrEmployees.sort().reverse()
      console.log(employees)
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
          <Form onSubmit={this.addEmployees}>
            <div className="modal-body">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={this.state.name} placeholder="Name" onChange={this.getName} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Salary</Form.Label>
                <Form.Control type="text" name="salary" value={this.state.salary} placeholder="Salary" onChange={this.getSalary}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" name="age" value={this.state.age} placeholder="Age" onChange={this.getAge}/>
              </Form.Group>
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