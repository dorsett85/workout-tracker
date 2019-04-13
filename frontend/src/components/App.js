import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import NavHeader from './NavHeader';
import Landing from './Landing/Landing';
import Login from './Login/Login';
import Register from './Register/Register';
import User from './User/User';


const App = () => (
  <Router>
    <>
      <Route component={NavHeader} />
      <Container className={styles.appContainer}>
        <Row>
          <Col>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/guest" component={User} />
            <Route exact path="/user/:id" component={User} />
          </Col>
        </Row>
      </Container>
    </>
  </Router>
);

export default hot(App);
