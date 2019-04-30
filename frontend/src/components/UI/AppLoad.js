import React, { useEffect } from 'react';
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

const AppLoad = (props) => {
  const {
    checkInUser, setAppIsLoaded, appLoaded, children
  } = props;

  useEffect(() => {
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
  }, []);

  return (
    appLoaded
      ? children
      : <LoadingSpinner className="mt-3" />
  );
};

export default connect(mapStatetoProps, mapDispatchToProps)(AppLoad);

AppLoad.propTypes = {
  appLoaded: PropTypes.bool.isRequired,
  setAppIsLoaded: PropTypes.func.isRequired,
  checkInUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
