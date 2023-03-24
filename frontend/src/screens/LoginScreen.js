import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //let navigate = useNavigate();

  const { search } = useLocation();
  const redirect = search ? search.split('=')[1] : '/';

  // console.log(redirect);

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, redirect]);

  const submitHandler = (e) => {
    console.log('OK');
  };

  return (
    <>
      {/* <Meta title={'Travel+ | Login'} /> */}
      <FormContainer>
        <hr></hr>
        <h1>התחברות</h1>
        <hr></hr>
        <div>
          <h1> </h1>
          <h1> </h1>
        </div>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="email">
            <FormLabel className="text-center" style={{ width: '100%' }}>
              <strong>אימייל</strong>
            </FormLabel>
            <FormControl
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <FormGroup controlId="password">
            <FormLabel className="text-center" style={{ width: '100%' }}>
              <strong>סיסמא</strong>
            </FormLabel>
            <FormControl
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <div>
            <h2> </h2>
          </div>
          <div className="d-grid gap-3">
            <Button type="submit" variant="primary">
              התחבר
            </Button>
          </div>
        </Form>
        <h2> </h2>
        <Row className="py-3">
          <Col className="text-center">
            <strong>עדיין אין לך חשבון?</strong>
            <Link to={'/register'}>
              {' '}
              <strong> הירשם </strong>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
