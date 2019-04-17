import { hot } from 'react-hot-loader/root';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import AppLoad from './UI/AppLoad';
import NavHeader from './NavHeader/NavHeader';
import ConditionalRoute from './UI/ConditionalRoute';
import Landing from './Landing/Landing';
import Login from './Login/Login';
import Register from './Register/Register';
import User from './User/User';


const mapStateToProps = ({ user: { id } }) => (
  { id }
);

const App = ({ id }) => (
  <AppLoad>
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
              <ConditionalRoute
                exact
                path="/user/:id"
                component={User}
                condition={id}
                redirect="/login"
              />
              <Route path="/guest" component={User} />
            </Col>
          </Row>
        </Container>
      </>
    </Router>
  </AppLoad>
);

export default hot(connect(mapStateToProps)(memo(App)));

App.propTypes = {
  id: PropTypes.string.isRequired
};
