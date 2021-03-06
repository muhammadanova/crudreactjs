import React from 'react';
import axios from 'axios';
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      persons: [],
      ModalAddPerson: false,
      name: '',
      email: '',
      phone: '',
      city: ''
    }
  }

  componentDidMount(){
    this.getAllUsers()
  }

  getName = event => {
    this.setState({ name: event.target.value });
  }

  getEmail = event => {
    this.setState({ email: event.target.value });
  }

  getPhone = event => {
    this.setState({ phone: event.target.value });
  }

  getCity = event => {
    this.setState({ city: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    let formData = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      city: this.state.city,
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, formData)
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
              <Button variant="secondary" type="button" size="sm">Cancel</Button>
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