import { hot } from 'react-hot-loader/root';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { getFetch } from 'api';
import { changeUser } from 'state/actions/index';
import styles from 'assets/css/app.scss';
import NavHeader from './NavHeader/NavHeader';
import Landing from './Landing/Landing';
import Login from './Login/Login';
import Register from './Register/Register';
import User from './User/User';


const mapStateToProps = ({ user }) => (
  { user }
);

const mapDispatchToProps = dispatch => (
  { changeUser: user => dispatch(changeUser(user)) }
);

const ConditionalRoute = ({ condition, redirect, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      condition
        ? <Component {...props} />
        : <Redirect to={redirect} />
    )}
  />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getUser();
  }

  getUser() {
    getFetch({
      url: '/api/login',
      success: (user) => {
        this.props.changeUser(user);
      },
      error: err => console.log(err)
    });
  }

  render() {
    const { user: { id } } = this.props;
    return (
      <Router>
        <>
          <Route component={NavHeader} />
          <Container className={styles.appContainer}>
            <Row>
              <Col>
                <ConditionalRoute
                  exact
                  path="/"
                  component={Landing}
                  condition={!id}
                  redirect={`/user/${id}`}
                />
                <ConditionalRoute
                  path="/login"
                  component={Login}
                  condition={!id}
                  redirect={`/user/${id}`}
                />
                <ConditionalRoute
                  path="/register"
                  component={Register}
                  condition={!id}
                  redirect={`/user/${id}`}
                />
                <Route path="/guest" component={User} />
                <ConditionalRoute
                  exact
                  path="/user/:id"
                  component={User}
                  condition={id}
                  redirect="/login"
                />
              </Col>
            </Row>
          </Container>
        </>
      </Router>
    );
  }
}

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  user: PropTypes.object.isRequired,
  changeUser: PropTypes.func.isRequired
};
