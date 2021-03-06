import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import styles from 'assets/css/app.scss';
import AddExerciseDropdownMenu from './AddExerciseDropdownMenu';


const TableHeaderCellFirst = (props) => {
  const { id, title, dispatch } = props;

  return (
    <th>
      <div className="d-flex justify-content-between align-items-center">
        <span>{title}</span>
        <Dropdown className={styles.noCaretDropdown}>
          <Dropdown.Toggle
            size="sm"
            variant="outline-light"
          >
            {'Add exercise'}
          </Dropdown.Toggle>
          <Dropdown.Menu
            as={AddExerciseDropdownMenu}
            id={id}
            dispatch={dispatch}
          />
        </Dropdown>
      </div>
    </th>
  );
};

export default memo(TableHeaderCellFirst);

TableHeaderCellFirst.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
