import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import NavHeader from './NavHeader';
import Landing from './Landing/Landing';
import Login from './Login/Login';
import User from './User/User';


const App = () => (
  <Router>
    <>
      <Route component={NavHeader} />
      <Container className={styles.appContainer}>
        <Row>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/guest" component={User} />
          <Route exact path="/user/:id" component={User} />
        </Row>
      </Container>
    </>
  </Router>
);

export default App;
