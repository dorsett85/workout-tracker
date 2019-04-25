import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import Workout from './Workout/Workout';


const mapStateToProps = ({ user }) => (
  { user }
);

const User = (props) => {
  const { user: { username } } = props;
  return (
    <Row className={styles.fadeIn}>
      <Col>
        <h2 className="mb-3">{`Welcome ${username}`}</h2>
        <Workout />
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps)(User);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired
};
