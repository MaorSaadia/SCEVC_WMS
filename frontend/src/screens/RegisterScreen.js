import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const { location } = useLocation();
  const redirect = location ? location.split('=')[1] : '/';

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage('Passwords Do Not Match');
    }
  };

  return (
    <>
      <FormContainer>
        <hr></hr>
        <h1>Sign Up</h1>
        <hr></hr>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <FormLabel>
              <strong>Name:</strong>
            </FormLabel>
            <FormControl
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <FormGroup controlId="email">
            <FormLabel>
              <strong>Email Address:</strong>
            </FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>

          <FormGroup controlId="password">
            <FormLabel>
              <strong>Password:</strong>
            </FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>

          <FormGroup controlId="confirmPassword">
            <FormLabel>
              <strong>Confirm Password:</strong>
            </FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </FormGroup>

          <div>
            <h2> </h2>
          </div>
          <div className="d-grid gap-3">
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col>
            Already Have an Account? <Link to={'/login'}>Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
