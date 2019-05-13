import React from 'react';
import { Form } from 'react-bootstrap';


const FormInput = ({ id, label, validFeedback, errFeedback, ...props }) => (
  <Form.Group controlId={id}>
    <Form.Label>{label}</Form.Label>
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
