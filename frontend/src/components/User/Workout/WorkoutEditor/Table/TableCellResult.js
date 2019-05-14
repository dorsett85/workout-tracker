import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Spinner, Button } from 'react-bootstrap';
import { updateFetch } from 'api/';
import debounce from 'assets/js/functions/debounce';
import styles from 'assets/css/app.scss';
import { updateResultValue } from '../actions';


const TableCellResult = (props) => {
  const { wrId, value, dispatch } = props;
  const [wrValue, setWrValue] = useState(value);
  const [editing, setEditing] = useState(false);
  const [updatingWrValue, setUpdatingWrValue] = useState(false);
  const [updateWrValue, setUpdateWrValue] = useState(false);
  const [updatedWrValue, setUpdatedWrValue] = useState(false);

  const cellRef = useRef(null);
  const inputDivRef = useRef(null);

  // Create effect for initial sizing of the form control based on the td size
  useEffect(() => {
    if (editing) {
      const { clientWidth: cellWidth } = cellRef.current;
      inputDivRef.current.style.width = `${cellWidth - 10}px`;
    }
  }, [editing]);

  const handleEditing = show => () => {
    setEditing(show);
    if (!show) { setUpdatedWrValue(false); }
  };

  // Handler for value change, use debounce to only update after a timeout
  const handleChange = (e) => {
    setWrValue(e.target.value);
    setUpdatingWrValue(true);
    setUpdateWrValue(false);
    setUpdatedWrValue(false);
    debounce(() => setUpdateWrValue(true), 500);
  };

  // Create an effect for when the value is ready to update
  useEffect(() => {
    if (updateWrValue) {
      updateFetch({
        url: '/api/workout/results',
        body: { wrId, wrValue },
        success: (data) => {
          dispatch(updateResultValue(data));
          setUpdatingWrValue(false);
          setUpdatedWrValue(true);
        }
      });
    }
  }, [updateWrValue]);

  return (
    <td
      ref={cellRef}
      onClick={handleEditing(true)}
      className={`position-relative ${styles.cursorPointer}`}
      role="presentation"
    >
      {!editing
        ? wrValue
        : (
          <div ref={inputDivRef} className="position-absolute">
            <InputGroup>
              <Form.Control
                autoFocus
                isValid={updatedWrValue || null}
                onChange={handleChange}
                onBlur={handleEditing(false)}
                size="sm"
                placeholder="Enter a value..."
                value={wrValue}
              />
              {updatingWrValue && (
                <InputGroup.Append>
                  <InputGroup.Text>
                    <Spinner animation="border" size="sm" />
                  </InputGroup.Text>
                </InputGroup.Append>
              )}
              {!updatingWrValue && (
                <InputGroup.Append>
                  <Button
                    variant="light"
                    size="sm"
                  >
                    &times;
                  </Button>
                </InputGroup.Append>
              )}
            </InputGroup>
          </div>
        )
      }
    </td>
  );
};

export default memo(TableCellResult);

TableCellResult.propTypes = {
  wrId: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
