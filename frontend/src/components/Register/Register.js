import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { registerUser } from 'state/actions/index';


const mapDispatchToProps = dispatch => (
  { registerUser: user => dispatch(registerUser(user)) }
);

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      registering: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.registerUser({ username, password });
  }

  render() {
    const { handleInput, handleSubmit } = this;
    const { username, password } = this.state;
    return (
      <Row>
        <Col xs={12} md={4}>
          <h2>Register</h2>
          <p>
            <span>Already registered? Login </span>
            <Link to="/login">here</Link>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={handleInput}
                value={username}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleInput}
                value={password}
                placeholder="Enter password"
              />
            </Form.Group>
            <Button type="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(mapDispatchToProps)(Register);

Register.propTypes = {
  registerUser: PropTypes.func.isRequired
};
