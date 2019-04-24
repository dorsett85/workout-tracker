import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import NavHeader from '../NavHeader/NavHeader';
import ConditionalRoute from './ConditionalRoute';
import Landing from '../Landing/Landing';
import lazyLoad from './lazyLoad';


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
                component={lazyLoad(() => import('../Login/Login'))}
                condition={!id}
                redirect={`/user/${id}`}
              />
              <ConditionalRoute
                path="/register"
                component={lazyLoad(() => import('../Register/Register'))}
                condition={!id}
                redirect={`/user/${id}`}
              />
              <ConditionalRoute
                exact
                path={`/user/${id}`}
                component={lazyLoad(() => import('../User/User'))}
                condition={id}
                redirect="/login"
              />
              <Route
                path="/guest"
                component={lazyLoad(() => import('../User/User'))}
              />
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
