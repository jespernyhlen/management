import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
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

    const passwordResetForm = () => (
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
                <FormHeaderText>New Password</FormHeaderText>
                {passwordResetForm()}
            </FormContent>
        </FormContainer>
    );

    return <main>{formContent()}</main>;
};

export default ResetPassword;
