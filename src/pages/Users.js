import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    getCookie,
    removeAuthenticatedUser,
    // updateUser,
} from '../utils/Helpers';
import Notification from '../components/Notification';
import Nav from '../layout/Navbar';
import Gravatar from 'react-gravatar';
import styled, { css } from 'styled-components';

import { devices } from '../styles/devices';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const Private = ({ history }) => {
    const [values, setValues] = useState({
        users: [],
        buttonText: 'Update',
    });

    const token = getCookie('token');

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${API_URL}/users`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response);
                setValues({ ...values, users: response.data });
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status !== 200) {
                    removeAuthenticatedUser(() => {
                        history.push('/');
                    });
                }
            });
    }, []);

    const { users, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        // event.preventDefault();
        // setValues({ ...values, buttonText: 'Updating' });
        // axios({
        //     method: 'PUT',
        //     url: `${API_URL}/user/update`,
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        //     data: { name, password },
        // })
        //     .then((response) => {
        //         updateUser(response, () => {
        //             setValues({
        //                 ...values,
        //                 password: '',
        //                 buttonText: 'Update',
        //             });
        //             Notification('Profile updated successfully', 'success');
        //         });
        //     })
        //     .catch((error) => {
        //         setValues({ ...values, buttonText: 'Update' });
        //         Notification(error.response.data.error, 'danger');
        //     });
    };

    const userContent = () => (
        <>
            {Object.keys(users).map((key, index) => (
                <UserContent key={key}>
                    <Gravatar
                        email={users[key].email}
                        size={40}
                        style={{
                            margin: '0 0 2rem',
                            margin: '0px 1.5rem 1rem 0',
                            borderRadius: '5px',
                        }}
                    />

                    <Column>
                        <ColumnType>Email</ColumnType>
                        <p>
                            {users[key].email} {index * 100 + 1000}
                        </p>
                    </Column>
                    <Column>
                        <ColumnType>Name</ColumnType>
                        <p>{users[key].name}</p>
                    </Column>
                    <Column>
                        <ColumnType>Role</ColumnType>
                        <p>{users[key].role}</p>
                    </Column>
                    <Column>
                        <ColumnType>Created</ColumnType>
                        <p>
                            {new Date(users[key].created).toLocaleDateString()}
                        </p>
                    </Column>
                </UserContent>
            ))}
        </>
    );

    const usersContent = () => (
        <UsersContainer>
            <Nav />
            <UsersContent>
                <UsersHeader>
                    <UsersHeaderText>Users</UsersHeaderText>
                </UsersHeader>
                {userContent()}
            </UsersContent>
        </UsersContainer>
    );

    return (
        <main>
            <Container>{usersContent()}</Container>
        </main>
    );
};

export default Private;

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    width: fit-content;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);

    max-width: 1260px;
    flex-direction: ${(props) =>
        props.direction === 'reverse' ? 'row' : 'row-reverse'};

    @media ${devices.tablet} {
        flex-direction: column;
        box-shadow: none;
    }
`;

export const UsersContainer = styled.div`
    width: 100%;
    background: #fff;
`;

export const UsersContent = styled.div`
    padding: 150px 80px;
    margin: 0 auto;
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    form {
        div {
            position: relative;
        }
    }

    @media ${devices.mobile} {
        padding: 40px 20px;
    }
`;

export const UsersHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const UsersHeaderText = styled.h1`
    margin: 0 0 30px;
    color: #2c3a5a;
    font-weight: 600;

    @media ${devices.mobile} {
        font-size: 2rem;
        margin-top: 3.5px;
    }
`;

export const UserContent = styled.div`
    display: flex;
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    &:nth-child(2) {
        min-width: 230px;
    }
    &:nth-child(3) {
        width: 230px;
    }
    &:nth-child(4) {
        width: 100px;
    }
    &:nth-child(5) {
        width: 100px;
    }
`;

export const ColumnType = styled.span`
    color: #888;
    font-size: 0.8rem;
`;
