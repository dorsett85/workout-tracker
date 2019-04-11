import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggingIn: false
    };
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={4}>
          <h2>Login</h2>
          <p>
            <span>Not registered? Register </span>
            <Link to="/register">here</Link>
          </p>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Enter password" />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
