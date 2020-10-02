import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
    setClientData,
    isAuthenticated,
    getAuthenticatedUser,
} from '../utils/Helpers';
import Notification from '../components/Notification';
import {
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
    Button,
    TextWithLink,
    TextLine,
} from '../styles/formStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

console.log(process.env.REACT_APP_ENVIRONMENT);
const Login = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'SIGN IN',
    });

    const { email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = (response) => {
        setClientData(response, () => {
            isAuthenticated() && getAuthenticatedUser().role === 'admin'
                ? history.push('/admin')
                : history.push('/private');
        });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'SIGNING IN' });
        axios({
            method: 'POST',
            url: `${API_URL}/login`,
            data: { email, password },
        })
            .then((response) => {
                setClientData(response, () => {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        buttonText: 'SIGNED IN',
                    });
                    isAuthenticated() && getAuthenticatedUser().role === 'admin'
                        ? history.push('/admin')
                        : history.push('/private');
                });
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'SIGN IN' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const signinForm = () => (
        <form>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('email')}
                    value={email}
                    placeholder='Email'
                    name='email'
                    type='email'
                    id='email'
                    required
                />
                <Label htmlFor='email'>
                    <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                    Email
                </Label>
            </FormGroup>

            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('password')}
                    value={password}
                    placeholder='Password'
                    autoComplete='new-password'
                    name='password'
                    type='password'
                    id='password'
                    required
                />
                <Label htmlFor='password'>
                    <FontAwesomeIcon className='mr-2' icon={faUnlockAlt} />
                    Password
                </Label>
            </FormGroup>
            <br />
            <div>
                <Button
                    bgColor={'#2c3a5a'}
                    btnType={'main'}
                    onClick={clickSubmit}
                >
                    {buttonText}
                </Button>
            </div>
        </form>
    );

    return (
        <main>
            <FormContainer>
                <FormContent>
                    {isAuthenticated() ? <Redirect to='/' /> : null}
                    <FormHeaderText>Login</FormHeaderText>
                    {signinForm()}
                    <br />
                    <TextWithLink>
                        Forgot your password?
                        <Link to='/auth/password/forgot'>Reset Password</Link>
                    </TextWithLink>
                    <TextLine>
                        <span>OR</span>
                    </TextLine>

                    <TextWithLink>
                        Don't have an account?
                        <Link to='/register'>Register Now</Link>
                    </TextWithLink>
                </FormContent>
            </FormContainer>
        </main>
    );
};

export default Login;
