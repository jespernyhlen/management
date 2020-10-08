import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../utils/Helpers';
import Notification from '../components/Notification';
import {
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
    TextWithLink,
} from '../styles/FormStyles';
import { ButtonContainer, Button } from '../styles/Buttons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faUnlockAlt,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const Register = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'SIGN UP',
    });

    const { name, email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'SIGNING UP' });
        axios({
            method: 'POST',
            url: `${API_URL}/register`,
            data: { name, email, password },
        })
            .then((response) => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    buttonText: 'SIGNED UP',
                });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'SIGN UP' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const displayForm = () => (
        <form>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('name')}
                    value={name}
                    placeholder='Name'
                    name='name'
                    type='text'
                    id='name'
                />
                <Label htmlFor='name'>
                    <FontAwesomeIcon className='mr-2' icon={faUser} />
                    Name
                </Label>
            </FormGroup>

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

            <ButtonContainer>
                <Button bgColor={'#3e60ad'} onClick={clickSubmit}>
                    {buttonText}
                </Button>
            </ButtonContainer>
        </form>
    );

    return (
        <FormContainer>
            <FormContent>
                {isAuthenticated() ? <Redirect to='/' /> : null}
                <FormHeaderText className=''>Register</FormHeaderText>
                {displayForm()}
                <br />
                <TextWithLink>
                    Already have an account?
                    <Link to='/login'>Sign in</Link>
                </TextWithLink>
            </FormContent>
        </FormContainer>
    );
};

export default Register;
