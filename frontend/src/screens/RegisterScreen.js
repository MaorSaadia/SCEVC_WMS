import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Card from '../components/Card';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmpassword);

    if (password !== confirmpassword) {
      setError('Passwords Do Not Match');
      //setIsError(true);
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Something went wrong, please try again.');
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <h1></h1>
      <Card>
        <hr className="hr-line-right"></hr>
        <h1>הרשמה</h1>
        <hr className="hr-line-left"></hr>
        {error && <Message variant="danger">{error}</Message>}
        {isLoading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Input
            element="input"
            id="name"
            type="name"
            label="שם מלא:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="נא להזין שם."
            onInput={inputHandler}
          />
          {/* <FormControl
              style={{ direction: 'rtl' }}
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl> */}
          <Input
            element="input"
            style={{ direction: 'rtl' }}
            id="email"
            type="email"
            label="אימייל מכללה:"
            validators={[VALIDATOR_EMAIL()]}
            errorText="אנא הזן כתובת דוא'ל תקנית של המכללה."
            onInput={inputHandler}
          />
          {/* <FormControl
              style={{ direction: 'rtl' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl> */}
          <Input
            element="input"
            id="password"
            type="password"
            label="סיסמא:"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="נא להזין סיסמה חוקית, לפחות 6 תווים."
            onInput={inputHandler}
          />
          {/* 
            <FormControl
              style={{ direction: 'rtl' }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl> */}

          {/* <FormControl
              style={{ direction: 'rtl' }}
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl> */}
          <h2> </h2>
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              הירשם
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col className="text-center">
            <strong>רשום למערכת?</strong>{' '}
            <Link to={'/login'}>
              <strong>התחבר </strong>
            </Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default RegisterScreen;
