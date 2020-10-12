import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie, removeAuthenticatedUser } from '../utils/Helpers';
import Notification from '../components/Notification';
import Gravatar from 'react-gravatar';
import styled, { css } from 'styled-components';
import { PageNav, PageNavTitle } from '../styles/Layout';

import { devices } from '../styles/Devices';

const API_URL =
    process.env.REACT_APP_ENVIRONMENT === 'development'
        ? 'http://localhost:8888/api'
        : process.env.REACT_APP_API;

const Users = ({ history }) => {
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

    const { users } = values;

    let headers = ['Avatar', 'email', 'name', 'role', 'created'];

    let getHeaders = () => {
        var columns = headers.map((head) => {
            return <TableHeader>{head}</TableHeader>;
        });
        return <TableRow>{columns}</TableRow>;
    };

    let getRows = () => {
        return Object.keys(users).map((key, index) => {
            console.log(users[key]);
            return (
                <TableRow key={key}>
                    <TableData>
                        <Gravatar
                            email={users[key].email}
                            size={40}
                            style={{
                                margin: '',
                                borderRadius: '5px',
                            }}
                        />
                    </TableData>

                    <TableData data-label='email'>{users[key].email}</TableData>
                    <TableData data-label='name'>{users[key].name}</TableData>
                    <TableData data-label='role'>{users[key].role}</TableData>
                    <TableData data-label='created'>
                        {new Date(users[key].created).toLocaleDateString()}
                    </TableData>
                </TableRow>
            );
        });
    };

    let userTable = () => {
        return (
            <Table className='responsive-table'>
                <Thead>{getHeaders()}</Thead>
                <Tbody>{getRows()}</Tbody>
            </Table>
        );
    };

    return (
        <>
            <PageNav>
                <PageNavTitle>
                    <b>Members</b> - Information
                </PageNavTitle>
            </PageNav>
            <UsersContainer>
                <UsersHeader>
                    <UsersHeaderText>
                        {values.users && values.users.length + ' Members found'}
                    </UsersHeaderText>
                </UsersHeader>
                <TableContainer> {userTable()}</TableContainer>
            </UsersContainer>
        </>
    );
};

export default Users;

const UsersContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem;
    @media ${devices.mobile} {
        padding: 1rem;
    }
`;

const UsersHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const UsersHeaderText = styled.h1`
    font-size: 16px;
    color: #131212;
    margin: 0 0 1rem;
    font-weight: 700;

    @media ${devices.mobile} {
        font-size: 1.75rem;
        margin-top: 3.5px;
    }
`;

const TableContainer = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    border-spacing: 0;
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 0 0.5em;
    border-collapse: separate;
    max-width: 1260px;
`;

const Thead = styled.thead`
    visibility: hidden;
    position: absolute;
    color: #666;
    transform: translateY(-150vw);

    tr {
        background: transparent;
        box-shadow: none;
    }
    @media screen and (min-width: 600px) {
        visibility: visible;
        position: relative;
        transform: translateY(0);
    }
`;

const Tbody = styled.tbody``;

const TableRow = styled.tr`
    display: block;
    border: 1px solid #e6e6e6;
    padding: 1rem 1rem 0;
    background: #fdfdfd;
    box-shadow: 0 2.5px 5px rgba(0, 0, 0, 0.025);

    &:hover {
        background: #fafafa;
    }
    @media screen and (min-width: 600px) {
        display: table-row;
        border-bottom-width: 1px;
        margin-bottom: 0;
    }
`;

const TableData = styled.td`
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ddd;
    padding: 10px;
    text-align: left;
    font-weight: 500;
    color: #444;
    display: block;

    @media ${devices.mobile} {
        display: flex;
        justify-content: space-between;
    }

    &:last-child {
        border-top-right-radius: 2.5px;
        border-bottom-right-radius: 2.5px;
    }

    &:first-child {
        border-top-left-radius: 2.5px;
        border-bottom-left-radius: 2.5px;
    }

    @media screen and (min-width: 600px) {
        display: table-cell;
        text-align: left;
        font-size: 14px;
        border-bottom: none;
    }
    &:before {
        content: attr(data-label);
        float: left;
        text-transform: uppercase;
        font-weight: bold;
        @media screen and (min-width: 600px) {
            content: '';
            display: none;
        }
    }
`;
const TableHeader = styled.th`
    text-transform: uppercase;
    font-size: 11px;
    padding: 10px;
    text-align: left;
`;
