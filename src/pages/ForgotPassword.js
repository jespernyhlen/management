import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import {
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
    Button,
} from '../styles/formStyles';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        buttonText: 'Send password reset link',
    });

    const { email, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${API_URL}/forgot-password`,
            data: { email },
        })
            .then((response) => {
                setValues({
                    ...values,
                    email: '',
                    buttonText: 'Send password reset link',
                });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                setValues({
                    ...values,
                    buttonText: 'Send password reset link',
                });
                Notification(error.response.data.error, 'danger');
            });
    };

    const passwordForgotForm = () => (
        <form>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('email')}
                    value={email}
                    placeholder='Email'
                    type='email'
                    name='email'
                    id='email'
                />
                <Label>Enter email to your account</Label>
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

    const formContent = () => (
        <FormContainer>
            <FormContent>
                <FormHeaderText>Reset Password</FormHeaderText>
                {passwordForgotForm()}
            </FormContent>
        </FormContainer>
    );

    return <main>{formContent()}</main>;
};

export default ForgotPassword;
