import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setLastCompletedWorkoutDate } from 'state/actions';
import { updateFetch, deleteFetch } from 'api/';
import styles from 'assets/css/app.scss';
import { updateDateCompleted, deleteDate } from '../actions';


const mapDispatchToProps = dispatch => (
  { appDispatch: dispatch }
);

const TableCellDate = (props) => {
  const { date, wdId, completed, dispatch, appDispatch } = props;

  const handleCompleteToggle = () => {
    updateFetch({
      url: '/api/workout/date',
      body: { wdId, completed: !completed },
      success: (newCompleted) => {
        dispatch(updateDateCompleted({ wdId, completed: newCompleted }));

        // Update the workout last completed status as well
        updateFetch({
          url: '/api/workout',
          body: { wdId, lastCompleted: true },
          success: data => appDispatch(setLastCompletedWorkoutDate(data))
        });
      }
    });
  };

  const handleConfirmDelete = () => {
    deleteFetch({
      url: '/api/workout/date',
      body: { wdId },
      success: () => dispatch(deleteDate(wdId))
    });
  };

  return (
    <td>
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-nowrap">{date.toLocaleString()}</div>
        <div className="text-nowrap">
          <OverlayTrigger
            overlay={<Tooltip>Set as complete/incomplete</Tooltip>}
          >
            <Button
              onClick={handleCompleteToggle}
              className="mx-2"
              size="sm"
              variant="outline-success"
              active={completed}
            >
              {'✓'}
            </Button>
          </OverlayTrigger>
          <DropdownButton
            className={`${styles.noCaretDropdown} d-inline`}
            variant="outline-danger"
            size="sm"
            title="×"
            drop="down"
          >
            <Dropdown.Header>Are you sure?</Dropdown.Header>
            <Dropdown.Item
              eventKey={1}
              onClick={handleConfirmDelete}
            >
              {'Yes'}
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </td>
  );
};

export default connect(null, mapDispatchToProps)(memo(TableCellDate));

TableCellDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  wdId: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  appDispatch: PropTypes.func.isRequired
};
