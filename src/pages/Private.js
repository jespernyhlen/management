import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gravatar from 'react-gravatar';
import {
    getAuthenticatedUser,
    getCookie,
    removeAuthenticatedUser,
    updateUser,
} from '../utils/Helpers';

/* STYLES */
import {
    FormHeader,
    FormGroup,
    FormContainer,
    FormContent,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
} from '../styles/FormStyles';
import { Header, HeaderTitle } from '../styles/Header';
import { ButtonContainer, Button } from '../styles/Buttons';

/* COMPONENTS */
import Loader from '../components/Loader';
import Notification from '../components/Notification';

import { API_URL } from '../constants';

const Private = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Update',
        isLoading: true,
    });
    const token = getCookie('token');

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API_URL}/user/${getAuthenticatedUser()._id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email, isLoading: false });
            })
            .catch((error) => {
                if (error.response.status !== 200) {
                    removeAuthenticatedUser(() => {
                        history.push('/');
                    });
                }
            });
    }, []);

    const { role, name, email, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Updating' });
        axios({
            method: 'PUT',
            url: `${API_URL}/user/update`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { name, password },
        })
            .then((response) => {
                updateUser(response, () => {
                    setValues({
                        ...values,
                        password: '',
                        buttonText: 'Update',
                        isLoading: false,
                    });
                    Notification('Profile updated successfully', 'success');
                });
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'Update' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const displayForm = () => (
        <form>
            <FormGroup>
                <InputFieldWithLabel
                    defaultValue={role}
                    type='text'
                    className='read-only'
                    name='role'
                    readOnly
                />
                <Label htmlFor='role'>Role</Label>
            </FormGroup>
            <FormGroup>
                <InputFieldWithLabel
                    defaultValue={email}
                    placeholder='Email'
                    type='email'
                    name='email'
                    className='read-only'
                    readOnly
                />
                <Label htmlFor='email'>Email</Label>
            </FormGroup>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('name')}
                    value={name}
                    name='name'
                    placeholder='Name'
                    type='text'
                />
                <Label htmlFor='name'>Name</Label>
            </FormGroup>
            <FormGroup>
                <InputFieldWithLabel
                    onChange={handleChange('password')}
                    value={password}
                    placeholder='New password'
                    autoComplete='new-password'
                    name='password'
                    type='password'
                />
                <Label htmlFor='password'>New password (or leave empty)</Label>
            </FormGroup>

            <br />

            <ButtonContainer>
                <Button onClick={clickSubmit}>{buttonText}</Button>
            </ButtonContainer>
        </form>
    );

    return (
        <>
            <Header>
                <HeaderTitle>
                    <b>User Settings</b>
                    {!values.isLoading && ' - ' + values.name}
                </HeaderTitle>
            </Header>

            <FormContainer>
                {!values.isLoading ? (
                    <FormContent>
                        <FormHeader>
                            <Gravatar
                                email={email}
                                size={40}
                                style={{
                                    margin: '0 1.5rem 2rem 0',
                                    borderRadius: '5px',
                                }}
                            />
                            <FormHeaderText>Profile</FormHeaderText>
                        </FormHeader>
                        {displayForm()}
                    </FormContent>
                ) : (
                    <Loader />
                )}
            </FormContainer>
        </>
    );
};

export default Private;
