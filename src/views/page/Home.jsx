import React from 'react';
import axios from 'axios';
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';

class Home extends React.Component {
  state = {
    persons: [],
    ModalAddPerson: false,
    form: {
      name: ''
      // email: '',
      // phone: '',
      // city: ''
    }
  }

  componentDidMount(){
    this.getAllUsers()
  }

  handleChange = event => {
    this.setState({ 
      form: {
        name: event.target.value }
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.form.name,
      // email: this.state.form.email,
      // phone: this.state.form.phone,
      // city: this.state.form.city,
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        this.state.persons.concat(res.data)
        console.log(res.data)
        this.getAllUsers()
        this.hideModal()
      })
      .catch(err => {
        console.log(err)
      })
  }

  getAllUsers = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      const persons = res.data
      console.log(res.data)
      this.setState({ persons })
    })
  }

  showModal = () => {
    this.setState({ ModalAddPerson: true });
  };

  hideModal = () => {
    this.setState({ ModalAddPerson: false });
  };

  render() {
    return (
      <section className="mt-5 mb-5">
        <Modal
          size="lg"
          centered
          show={this.state.ModalAddPerson}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Add Person
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
          <div className="modal-body">
            <form onSubmit={this.handleSubmit}>
              <label>
                Person Name:
                <input type="text" name="name" onChange={this.handleChange} />
              </label>
              <button type="submit">Add</button>
            </form>
            {/* <Form onSubmit={this.handleSubmit}>
              <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" name="name" placeholder="Your Name" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Your Email"/>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control type="text" placeholder="Your Phone"/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control type="" placeholder="Your City"/>
                    </Form.Group>
                  </Col>
              </Row>
            </Form> */}
          </div>
          <div className="modal-footer">
            <Button variant="primary" type="submit" size="sm">Submit</Button>
            <Button variant="secondary" type="button" size="sm">Cancel</Button>
          </div>
        </Modal>
        <Button
          size="sm"
          className="mb-3"
          variant="primary"
          type="button"
          onClick={this.showModal}
        >
          <i className="fa fa-plus"></i>&nbsp;Add Person
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.persons.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>{person.address.city}</td>
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

export default Home;