import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
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

const ResetPassword = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        newPassword: '',
        buttonText: 'Reset password',
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, newPassword, buttonText } = values;

    const handleChange = (event) => {
        setValues({ ...values, newPassword: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Resetting' });
        axios({
            method: 'PUT',
            url: `${API_URL}/reset-password`,
            data: { password: newPassword, passwordResetLink: token },
        })
            .then((response) => {
                setValues({ ...values, buttonText: 'Reset password' });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'Reset password' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const displayForm = () => (
        <form>
            <FormGroup className='form-group'>
                <InputFieldWithLabel
                    onChange={handleChange}
                    value={newPassword}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Type new password'
                    required
                />
                <Label htmlFor='password'>Type new password</Label>
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
                <FormHeaderText>New Password</FormHeaderText>
                {displayForm()}
            </FormContent>
        </FormContainer>
    );
};

export default ResetPassword;
