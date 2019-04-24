import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import NavHeader from '../NavHeader/NavHeader';
import ConditionalRoute from './ConditionalRoute';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import User from '../User/User';


const mapStateToProps = ({ user: { id } }) => (
  { id }
);

const Layout = ({ id }) => (
  <Router>
    <>
      <Route component={NavHeader} />
      <Container className={styles.appContainer}>
        <Row>
          <Col>
            <Switch>
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
                path={`/user/${id}`}
                component={User}
                condition={id}
                redirect="/login"
              />
              <Route path="/guest" component={User} />
              <Redirect to={`/user/${id}`} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  </Router>
);

export default connect(mapStateToProps)(memo(Layout));

Layout.propTypes = {
  id: PropTypes.number
};

Layout.defaultProps = {
  id: undefined
};
