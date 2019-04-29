import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { postFetch } from 'api/';
import { addDate } from '../actions';
import { convertQueryData } from '../functions';


const TableCellAddDate = (props) => {
  const { id, colSpan, dispatch } = props;

  const handleAddDate = () => {
    postFetch({
      url: '/api/workout/date',
      body: { id },
      success: row => dispatch(addDate(convertQueryData(row)))
    });
  };

  return (
    <td colSpan={colSpan}>
      <OverlayTrigger
        overlay={<Tooltip>Add a workout row</Tooltip>}
        placement="right"
      >
        <Button
          onClick={handleAddDate}
          size="sm"
          variant="outline-light"
        >
          {'Add +'}
        </Button>
      </OverlayTrigger>
    </td>
  );
};

export default memo(TableCellAddDate);

TableCellAddDate.propTypes = {
  id: PropTypes.number.isRequired,
  colSpan: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};
