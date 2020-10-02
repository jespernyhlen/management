import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    getAuthenticatedUser,
    getCookie,
    removeAuthenticatedUser,
    updateUser,
} from '../utils/Helpers';
import Notification from '../components/Notification';
import Gravatar from 'react-gravatar';
import {
    FormGroup,
    FormContainer,
    FormContent,
    FormHeader,
    FormHeaderText,
    InputFieldWithLabel,
    Label,
    Button,
} from '../styles/formStyles';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const Admin = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Update',
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
                console.log(response.data);

                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
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
            url: `${API_URL}/admin/update`,
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
                    });
                    Notification('Profile updated successfully', 'success');
                });
            })
            .catch((error) => {
                setValues({ ...values, buttonText: 'Update' });
                Notification(error.response.data.error, 'danger');
            });
    };

    const updateForm = () => (
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
                    placeholder='Name'
                    name='name'
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

            <div>
                <Button
                    bgColor={'#45b791'}
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
                <FormHeader>
                    <Gravatar
                        email={email}
                        size={40}
                        style={{
                            margin: '0 0 2rem',
                            margin: '0px 1.5rem 2rem 0',
                            borderRadius: '5px',
                        }}
                    />
                    <FormHeaderText>Profile</FormHeaderText>
                </FormHeader>
                {updateForm()}
            </FormContent>
        </FormContainer>
    );

    return <main>{formContent()}</main>;
};

export default Admin;
