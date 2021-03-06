import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { changeUser, deleteWorkout, setFetchingWorkouts } from 'state/actions';
import { postFetch } from 'api';
import styles from 'assets/css/app.scss';
import FormInput from '../UI/FormInput';


const mapDispatchToProps = dispatch => (
  {
    loginUser: user => dispatch(changeUser(user)),
    setFetching: bool => dispatch(setFetchingWorkouts(bool)),
    resetWorkouts: () => dispatch(deleteWorkout())
  }
);

class Register extends React.Component {
  static checkInputError(id, value) {
    const lengthErr = value.length < 5 && 'Must be at least 5 character';
    const spaceErr = /[\s]/.test(value) && 'Cannot contain spaces';
    const specialCharErr = /[!@#$%^&*]/.test(value) ? false : 'Must contain a special character (!@#$%^&*)';
    const inputError = id === 'username'
      ? [lengthErr, spaceErr].find(err => err !== false)
      : [lengthErr, spaceErr, specialCharErr].find(err => err !== false);
    return {
      isValid: !inputError,
      inputError
    };
  }

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
      validatingForm: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const { id, value } = e.target;
    const { validatingForm } = this.state;
    this.setState({
      [id]: value,
    });
    if (validatingForm) {
      const { isValid, inputError } = Register.checkInputError(id, value);
      this.setState({
        [`${id}IsValid`]: isValid,
        [`${id}IsInvalid`]: !isValid,
        [`${id}Error`]: inputError
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = e.currentTarget.elements;
    let formIsValid = true;

    // Check validity of inputs and invalidate form if any aren't valid
    const validatedInputs = [username, password].reduce((acc, { id, value }) => {
      const { isValid, inputError } = Register.checkInputError(id, value);
      if (formIsValid) { formIsValid = isValid; }
      return {
        ...acc,
        [`${id}IsValid`]: isValid,
        [`${id}IsInvalid`]: !isValid,
        [`${id}Error`]: inputError
      };
    }, {});

    // Set form validity and start validing inputs on any change
    this.setState({
      validatingForm: true,
      ...validatedInputs
    });

    if (formIsValid) {
      const { username: newUsername, password: newPassword } = this.state;
      postFetch({
        url: '/api/register',
        body: {
          username: newUsername,
          password: newPassword
        },
        success: ({ id, ...user }) => {
          const { setFetching, resetWorkouts, loginUser, history } = this.props;
          setFetching(true);
          resetWorkouts();
          loginUser({
            id,
            username: user.username
          });
          history.push(`/user/${id}`);
        },
        error: ({ status, message }) => {
          if (status === 409) {
            this.setState({
              usernameIsValid: false,
              usernameIsInvalid: true,
              usernameError: message
            });
          } else {
            console.log({ status, message });
          }
        }
      });
    }
  }

  render() {
    const { handleInput, handleSubmit } = this;
    const {
      username, usernameIsValid, usernameIsInvalid, usernameError,
      password, passwordIsValid, passwordIsInvalid, passwordError
    } = this.state;
    return (
      <Row className={styles.fadeIn}>
        <Col xs={12} md={4}>
          <h2>Register</h2>
          <p>
            <span>Already registered? Login </span>
            <Link to="/login">here</Link>
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
            <Button type="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default connect(null, mapDispatchToProps)(Register);

Register.propTypes = {
  setFetching: PropTypes.func.isRequired,
  resetWorkouts: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
