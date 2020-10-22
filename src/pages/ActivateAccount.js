import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* STYLES */
import {
    FormContainer,
    FormContent,
    FormHeaderText,
} from '../styles/FormStyles';
import { ButtonContainer, Button } from '../styles/Buttons';

/* COMPONENTS */
import Notification from '../components/Notification';

import { API_URL } from '../constants';

const ActivateAccount = ({ match }) => {
    const [values, setValues] = useState({
        token: '',
        show: true,
        buttonText: 'Activate',
    });

    useEffect(() => {
        let token = match.params.token;
        if (token) {
            setValues({ ...values, token });
        }
    }, []);

    const { token, buttonText } = values;

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

    return (
        <FormContainer>
            <FormContent>
                <FormHeaderText>Activate Account</FormHeaderText>
                <ButtonContainer>
                    <Button onClick={clickSubmit}>{buttonText}</Button>
                </ButtonContainer>
            </FormContent>
        </FormContainer>
    );
};

export default ActivateAccount;
