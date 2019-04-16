import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { changeUser } from 'state/actions/index';
import { postFetch } from 'api';
import FormInput from '../UI/FormInput';


const mapDispatchToProps = dispatch => (
  { changeUser: user => dispatch(changeUser(user)) }
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameIsValid: null,
      usernameIsInvalid: null,
      usernameError: '',
      password: '',
      passwordIsValid: null,
      passwordIsInvalid: null,
      passwordError: '',
      loggingIn: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
      [`${id}IsInvalid`]: false,
      [`${id}Error`]: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    postFetch({
      url: '/api/login',
      body: {
        username,
        password
      },
      success: (data) => {
        if (!data.username) {
          this.setState({
            usernameIsInvalid: true,
            usernameError: 'Username is not registered'
          });
        } else if (!data.password) {
          this.setState({
            usernameIsInvalid: false,
            usernameError: '',
            passwordIsInvalid: true,
            passwordError: 'Password does not match the username'
          });
        } else {
          this.props.changeUser({
            id: data.id,
            name: data.username
          });
          this.props.history.push(`/user/${data.id}`);
        }
      },
      error: err => console.log(err)
    });
  }

  render() {
    const { handleInput, handleSubmit } = this;
    const {
      username, usernameIsValid, usernameIsInvalid, usernameError,
      password, passwordIsValid, passwordIsInvalid, passwordError
    } = this.state;
    return (
      <Row>
        <Col xs={12} md={4}>
          <h2>Login</h2>
          <p>
            <span>Not registered? Register </span>
            <Link to="/register">here</Link>
          </p>
          <Form onSubmit={handleSubmit}>
            <FormInput
              id="username"
              label="Username"
              onChange={handleInput}
              value={username}
              placeholder="Enter username"
              isValid={usernameIsValid}
              isInvalid={usernameIsInvalid}
              errFeedback={usernameError}
              maxLength={12}
            />
            <FormInput
              id="password"
              label="Password"
              onChange={handleInput}
              value={password}
              placeholder="Enter password"
              isValid={passwordIsValid}
              isInvalid={passwordIsInvalid}
              errFeedback={passwordError}
              maxLength={12}
            />
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.object.isRequired,
  changeUser: PropTypes.func.isRequired
};
