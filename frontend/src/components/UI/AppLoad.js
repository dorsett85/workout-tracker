import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAppLoaded, changeUser } from 'state/actions';
import { getFetch } from 'api';
import LoadingSpinner from './LoadingSpinner';


const mapStatetoProps = ({ app: { appLoaded } }) => (
  { appLoaded }
);

const mapDispatchToProps = dispatch => (
  {
    setAppIsLoaded: loaded => dispatch(setAppLoaded(loaded)),
    checkInUser: user => dispatch(changeUser(user))
  }
);

class AppLoad extends React.Component {
  constructor(props) {
    super(props);
    this.getUser();
  }

  getUser() {
    const { setAppIsLoaded, checkInUser } = this.props;
    getFetch({
      url: '/api/initialLoad',
      success: (user) => {
        checkInUser(user);
        setAppIsLoaded(true);
      },
      error: (err) => {
        console.log(err);
        setAppIsLoaded(true);
      }
    });
  }

  render() {
    const { appLoaded, children } = this.props;
    return (
      appLoaded
        ? children
        : <LoadingSpinner className="mt-3" />
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppLoad);

AppLoad.propTypes = {
  appLoaded: PropTypes.bool.isRequired,
  setAppIsLoaded: PropTypes.func.isRequired,
  checkInUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
