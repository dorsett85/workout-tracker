import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import weightliftingImg from 'assets/img/weightlifting.png';
import styles from 'assets/css/app.scss';


export default class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick(path) {
    const { history } = this.props;
    history.push(path);
  }


  render() {
    const { handleLinkClick } = this;
    return (
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <img
            className={styles.navbarImg}
            src={weightliftingImg}
            width={40}
            alt="Weight lifting"
          />
          {'Workout Tracker'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => handleLinkClick('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => handleLinkClick('/login')}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavHeader.propTypes = {
  history: PropTypes.object.isRequired
};
