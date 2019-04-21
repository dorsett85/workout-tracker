import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { changeUser, resetWorkouts } from 'state/actions/index';
import { postFetch } from 'api';
import FormInput from '../UI/FormInput';


const mapDispatchToProps = dispatch => (
  {
    loginUser: user => dispatch(changeUser(user)),
    removeExistingWorkouts: () => dispatch(resetWorkouts())
  }
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
      passwordError: ''
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
    const { username: userNameInput, password: passwordInput } = this.state;

    postFetch({
      url: '/api/login',
      body: {
        username: userNameInput,
        password: passwordInput
      },
      success: ({ id, username, password }) => {
        if (username === false) {
          this.setState({
            usernameIsInvalid: true,
            usernameError: 'Username is not registered'
          });
        } else if (password === false) {
          this.setState({
            usernameIsValid: true,
            usernameIsInvalid: false,
            usernameError: '',
            passwordIsInvalid: true,
            passwordError: 'Password does not match the username'
          });
        } else {
          const { removeExistingWorkouts, loginUser, history } = this.props;
          removeExistingWorkouts();
          loginUser({ id, username });
          history.push(`/user/${id}`);
        }
      }
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
  removeExistingWorkouts: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
