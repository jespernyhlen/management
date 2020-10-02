import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Notification from '../components/Notification';
import {
    FormContainer,
    FormContent,
    FormHeaderText,
    Button,
} from '../styles/formStyles';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const ActivateAccount = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true,
        buttonText: 'Activate',
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token, show, buttonText } = values;

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Activating' });
        axios({
            method: 'POST',
            url: `${API_URL}/account-activation`,
            data: { token },
        })
            .then((response) => {
                setValues({
                    ...values,
                    show: false,
                    buttonText: 'Account activated',
                });
                Notification(response.data.message, 'success');
            })
            .catch((error) => {
                Notification(error.response.data.error, 'danger');
            });
    };

    const activationLink = () => (
        <div>
            <Button bgColor={'#2c3a5a'} btnType={'main'} onClick={clickSubmit}>
                {buttonText}
            </Button>
        </div>
    );

    const formContent = () => (
        <FormContainer>
            <FormContent>
                <FormHeaderText>Activate Account</FormHeaderText>
                {activationLink()}
            </FormContent>
        </FormContainer>
    );

    return <main>{formContent()}</main>;
};

export default ActivateAccount;
