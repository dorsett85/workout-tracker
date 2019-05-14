import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { changeUser, deleteWorkout, setFetchingWorkouts } from 'state/actions';
import { postFetch } from 'api';
import weightliftingImg from 'assets/img/weightlifting.png';
import githubImg from 'assets/img/github-logo.png';
import styles from './navHeader.scss';


const mapStateToProps = ({ user: { id, username } }) => (
  { id, username }
);

const mapDispatchToProps = dispatch => (
  {
    changeToGuest: user => dispatch(changeUser(user)),
    resetWorkouts: () => dispatch(deleteWorkout()),
    setFetching: bool => dispatch(setFetchingWorkouts(bool))
  }
);

class NavHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLinkClick(path) {
    const { history, location: { pathname } } = this.props;
    if (pathname === path) { return; }
    if (!['/', '/login', '/register', '/guest'].includes(pathname) && path === '/') { return; }
    history.push(path);
  }

  handleLogout() {
    const { resetWorkouts, setFetching, changeToGuest } = this.props;
    postFetch({
      url: '/api/logout',
      success: (user) => {
        setFetching(true);
        resetWorkouts();
        changeToGuest(user);
      }
    });
  }

  handleGithubClick() {
    window.open('https://github.com/dorsett85/workout-tracker','_blank');
  }

  render() {
    const { handleLinkClick, handleLogout, handleGithubClick } = this;
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
            width={32}
            alt="Weight lifting"
          />
          {'Workout Tracker'}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
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
            <Nav.Link onClick={handleGithubClick}>
              <img src={githubImg} alt="Github logo" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);

NavHeader.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string.isRequired,
  resetWorkouts: PropTypes.func.isRequired,
  setFetching: PropTypes.func.isRequired,
  changeToGuest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

NavHeader.defaultProps = {
  id: undefined
};
