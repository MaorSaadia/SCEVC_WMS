import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../components/FormElements/Input';
import { useForm } from '../hooks/FormHook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../util/validators';
import Card from '../components/Card';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const submitHandler = (e) => {
    console.log('OK');
  };

  return (
    <>
      <h1></h1>
      <Card>
        <hr className="hr-line-right"></hr>
        <h1>התחברות</h1>
        <hr className="hr-line-left"></hr>
        <h2> </h2>
        <Form onSubmit={submitHandler}>
          <Input
            element="input"
            style={{ direction: 'rtl' }}
            id="email"
            type="email"
            label="אימייל:"
            validators={[VALIDATOR_EMAIL()]}
            errorText="אנא הזן כתובת דוא'ל תקנית."
            onInput={inputHandler}
          />
          {/* <FormControl
              style={{ direction: 'rtl' }}
              type="email"
              placeholder=""
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
          {/* <FormControl
              style={{ direction: 'rtl' }}
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl> */}
          <div>
            <h2> </h2>
          </div>
          <div className="d-grid gap-3">
            <Button
              type="submit"
              variant="primary"
              disabled={!formState.isValid}
            >
              התחבר
            </Button>
          </div>
        </Form>
        <h2> </h2>
        <Row className="py-3">
          <Col className="text-center">
            <strong>עדיין לא רשום למערכת?</strong>{' '}
            <Link to={'/register'}>
              <strong>הירשם </strong>
            </Link>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default LoginScreen;
