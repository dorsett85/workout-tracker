import React from 'react';
import { Form, Spinner } from 'react-bootstrap';


const FormInput = ({ id, label, validFeedback, errFeedback, isUpdating, ...props }) => (
  <Form.Group controlId={id}>
    <Form.Label>
      {label}
      {isUpdating && (
        <>
          &nbsp;
          <Spinner animation="border" size="sm" />
        </>
      )}
    </Form.Label>
    <Form.Control {...props} />
    <Form.Control.Feedback type="valid">
      {validFeedback}
    </Form.Control.Feedback>
    <Form.Control.Feedback type="invalid">
      {errFeedback}
    </Form.Control.Feedback>
  </Form.Group>
);

export default FormInput;
