import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import styles from './ui.scss';


const LoadingSpinner = ({ className }) => (
  <div className={`d-flex justify-content-center ${styles.delayShow} ${className}`}>
    <Spinner animation="border" />
  </div>
);

export default LoadingSpinner;

LoadingSpinner.propTypes = {
  className: PropTypes.string
};

LoadingSpinner.defaultProps = {
  className: ''
};
