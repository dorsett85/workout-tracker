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
    appIsLoaded: loaded => dispatch(appIsLoaded(loaded)),
    changeUser: user => dispatch(changeUser(user))
  }
);

class AppLoad extends React.Component {
  constructor(props) {
    super(props);
    this.getUser();
  }

  getUser() {
    getFetch({
      url: '/api/initialLoad',
      success: (user) => {
        this.props.changeUser(user);
        this.props.appIsLoaded(true);
      },
      error: (err) => {
        console.log(err);
        this.props.appIsLoaded(true);
      }
    });
  }

  render() {
    const { appLoaded, children } = this.props;
    return (
      appLoaded
        ? children
        : (
          <div className={`d-flex justify-content-center mt-3 delayShow ${styles.delayShow}`}>
            <Spinner animation="border" />
          </div>
        )
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppLoad);

AppLoad.propTypes = {
  appIsLoaded: PropTypes.func.isRequired,
  appLoaded: PropTypes.bool.isRequired,
  changeUser: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};
