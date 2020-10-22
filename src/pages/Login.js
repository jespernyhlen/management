import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { setClientData, isAuthenticated } from '../utils/Helpers';

/* STYLES */
import {
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
    TextWithLink,
    TextLine,
} from '../styles/FormStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ButtonContainer, Button } from '../styles/Buttons';

/* COMPONENTS */
import Notification from '../components/Notification';

import { API_URL } from '../constants';

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
                    isAuthenticated() && history.push('/trelloprivate');
                });
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'SIGN IN' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const displayForm = () => (
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
            <ButtonContainer>
                <Button onClick={clickSubmit}>{buttonText}</Button>
            </ButtonContainer>
        </form>
    );

    return (
        <FormContainer>
            <FormContent>
                {isAuthenticated() ? <Redirect to='/' /> : null}
                <FormHeaderText>Login</FormHeaderText>
                {displayForm()}
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
    );
};

const mapStateToProps = (state) => {
    return {};
};

export default withRouter(connect(mapStateToProps, {})(Login));
