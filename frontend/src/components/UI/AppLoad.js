import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appIsLoaded, changeUser } from 'state/actions';
import { Spinner } from 'react-bootstrap';
import { getFetch } from 'api';
import styles from './ui.scss';


const mapStatetoProps = ({ app: { appLoaded } }) => (
  { appLoaded }
);

const mapDispatchToProps = dispatch => (
  {
    appLoaded: loaded => dispatch(appIsLoaded(loaded)),
    checkInUser: user => dispatch(changeUser(user))
  }
);

class AppLoad extends React.Component {
  constructor(props) {
    super(props);
    this.getUser();
  }

  getUser() {
    const { appLoaded, checkInUser } = this.props;
    getFetch({
      url: '/api/initialLoad',
      success: (user) => {
        checkInUser(user);
        appLoaded(true);
      },
      error: (err) => {
        console.log(err);
        appLoaded(true);
      }
    });
  }

  render() {
    const { appLoaded, children } = this.props;
    return (
      appLoaded
        ? children
        : (
          <div className={`d-flex justify-content-center mt-3 ${styles.delayShow}`}>
            <Spinner animation="border" />
          </div>
        )
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppLoad);

AppLoad.propTypes = {
  appLoaded: PropTypes.bool.isRequired,
  checkInUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
