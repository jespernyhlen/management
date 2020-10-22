import React, { useState } from 'react';
import axios from 'axios';

/* STYLES */
import {
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
} from '../styles/FormStyles';
import { ButtonContainer, Button } from '../styles/Buttons';

/* COMPONENTS */
import Notification from '../components/Notification';

import { API_URL } from '../constants';

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

    const displayForm = () => (
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

            <ButtonContainer>
                <Button onClick={clickSubmit}>{buttonText}</Button>
            </ButtonContainer>
        </form>
    );

    return (
        <FormContainer>
            <FormContent>
                <FormHeaderText>Reset Password</FormHeaderText>
                {displayForm()}
            </FormContent>
        </FormContainer>
    );
};

export default ForgotPassword;
