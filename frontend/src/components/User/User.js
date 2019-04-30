import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import Workout from './Workout/Workout';
import WorkoutEditorModal from './Workout/WorkoutEditor/WorkoutEditorModal';


const mapStateToProps = ({ user: { username } }) => (
  { username }
);

const User = (props) => {
  const { username } = props;
  return (
    <Row className={styles.fadeIn}>
      <Col>
        <h2 className="mb-3">{`Welcome ${username}`}</h2>
        <Workout />
        <WorkoutEditorModal />
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps)(memo(User));

User.propTypes = {
  username: PropTypes.string.isRequired
};
