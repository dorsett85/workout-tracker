import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';


export default class Landing extends React.Component {
  render() {
    return (
      <Jumbotron className="w-100">
        <h1>Welcome to the workout tracker</h1>
        <p>
          Create and track workouts with an effortless interface.
        </p>
        <p>
          Sample the application by clicking the
          guest button below or register to save your workouts.
        </p>
        <p>
          <Link to="/guest">
            <Button className="mr-1" variant="outline-dark">Guest</Button>
          </Link>
          <Link to="/login">
            <Button className="mr-1" variant="outline-dark">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-dark">Register</Button>
          </Link>
        </p>
      </Jumbotron>
    )
  }
}