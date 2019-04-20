import React from 'react';
import { connect } from 'react-redux';
import { changeUser } from 'state/actions';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { postFetch } from 'api/';
import weightliftingImg from 'assets/img/weightlifting.png';
import styles from './navHeader.scss';


const mapStateToProps = ({ user: { id, username } }) => (
  { id, username }
);

const mapDispatchToProps = dispatch => (
  { changeToGuest: user => dispatch(changeUser(user)) }
);

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLinkClick(path) {
    const { history } = this.props;
    history.push(path);
  }

  handleLogout() {
    const { changeToGuest } = this.props;
    postFetch({
      url: '/api/logout',
      success: user => changeToGuest(user),
      error: err => console.error(err)
    });
  }

  render() {
    const { handleLinkClick, handleLogout } = this;
    const { id, username } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Navbar.Brand
          className={styles.navBrand}
          onClick={() => handleLinkClick('/')}
        >
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
            <Nav.Link onClick={() => handleLinkClick('/')}>
              {id ? username : 'Home'}
            </Nav.Link>
            {!id && (
              <>
                <Nav.Link onClick={() => handleLinkClick('/login')}>Login</Nav.Link>
                <Nav.Link onClick={() => handleLinkClick('/register')}>Register</Nav.Link>
              </>
            )}
            {id && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);

NavHeader.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  changeToGuest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
