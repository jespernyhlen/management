import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    isAuthenticated,
    getAuthenticatedUser,
    removeAuthenticatedUser,
} from '../utils/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faTasks,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Gravatar from 'react-gravatar';

import styled from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Nav = ({ history }) => {
    const currentPath = history.location.pathname;
    const isActive = (path) => {
        return currentPath === path;
    };

    const options = {
        customUI: ({ onClose }) => (
            <ConfirmAlertBody>
                <ConfirmHeader>Confirm to logout</ConfirmHeader>Are you sure you
                want to logout?
                <ConfirmAlertButtonGroup>
                    <AlertButton
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </AlertButton>
                    <AlertButton
                        onClick={() => {
                            removeAuthenticatedUser(() => {
                                history.push('/login');
                            });
                            onClose();
                        }}
                    >
                        OK
                    </AlertButton>
                </ConfirmAlertButtonGroup>
            </ConfirmAlertBody>
        ),
        closeOnEscape: true,
        closeOnClickOutside: true,
    };

    return (
        <Navbar>
            {isAuthenticated() && (
                <NavProfileContainer>
                    <NavProfileImage>
                        <Gravatar
                            email={getAuthenticatedUser().email}
                            size={50}
                            style={{
                                margin: '0 auto',
                                borderRadius: '50%',
                            }}
                        />
                    </NavProfileImage>

                    <NavProfileName>
                        {getAuthenticatedUser().name}
                    </NavProfileName>
                    <NavProfileEmail>
                        {getAuthenticatedUser().email}
                    </NavProfileEmail>
                    <NavProfileRole>
                        {getAuthenticatedUser().role}
                    </NavProfileRole>
                </NavProfileContainer>
            )}
            <NavList className='nav'>
                <li className='nav-item' style={{ alignSelf: 'center' }}>
                    <Link
                        to='/'
                        className={
                            isActive('/') ? 'nav-link active' : 'nav-link'
                        }
                    >
                        <FontAwesomeIcon className='larger' icon={faHome} />
                        Home
                    </Link>
                </li>

                {!isAuthenticated() && (
                    <>
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <Link
                                to='/login'
                                className={
                                    isActive('/login')
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                <FontAwesomeIcon
                                    className='larger'
                                    icon={faSignInAlt}
                                />
                                Login
                            </Link>
                        </li>
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <Link
                                to='/register'
                                className={
                                    isActive('/register')
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                <FontAwesomeIcon
                                    className='larger'
                                    icon={faUserPlus}
                                />
                                Register
                            </Link>
                        </li>
                    </>
                )}

                {isAuthenticated() && getAuthenticatedUser().role === 'member' && (
                    <li className='nav-item' style={{ alignSelf: 'center' }}>
                        <Link
                            className={
                                isActive('/private')
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            to='/private'
                        >
                            <FontAwesomeIcon className='larger' icon={faUser} />
                            Profile
                        </Link>
                    </li>
                )}

                {isAuthenticated() && getAuthenticatedUser().role === 'admin' && (
                    <li className='nav-item' style={{ alignSelf: 'center' }}>
                        <Link
                            className={
                                isActive('/admin')
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            to='/admin'
                        >
                            <FontAwesomeIcon className='larger' icon={faUser} />
                            Profile
                        </Link>
                    </li>
                )}

                {isAuthenticated() && (
                    <>
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <Link
                                className={
                                    isActive('/board')
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                                to='/board'
                            >
                                <FontAwesomeIcon
                                    className='larger'
                                    icon={faTasks}
                                />
                                Board
                            </Link>
                        </li>
                        <li
                            className='nav-item'
                            style={{ alignSelf: 'center' }}
                        >
                            <span
                                className='nav-link'
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    confirmAlert(options);
                                }}
                            >
                                <FontAwesomeIcon
                                    className='larger'
                                    icon={faSignOutAlt}
                                />
                                Logout
                            </span>
                        </li>
                    </>
                )}
            </NavList>
        </Navbar>
    );
};

export default withRouter(Nav);

const Navbar = styled.nav`
    background: #fefefe;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    min-width: 220px;
    padding: 1.5rem;
`;

const NavProfileContainer = styled.div`
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 3rem;
    margin-top: 2rem;
`;

const NavProfileImage = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`;

const NavProfileName = styled.p`
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const NavProfileEmail = styled.p`
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
    color: #666;
`;
const NavProfileRole = styled(NavProfileEmail)`
    text-transform: capitalize;
`;

const NavList = styled.ul`
    max-width: 1260px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    li {
        height: 100%;
        width: 100%;
        margin-top: 0.75rem;
    }

    a.nav-link,
    span.nav-link {
        outline: none;
        border: none;
        color: #888;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        width: 100%;
        height: 40px;
        align-items: end;
        display: flex;
        padding: 12.5px 17.5px 30px;
        -webkit-transition: 0.2s;
        transition: 0.2s;
        border-left: 4px solid;
    }
    a.nav-link:hover,
    span.nav-link:hover {
        color: #222;
        outline: none;
    }

    a.nav-link.active {
        color: #fff;
        color: #3e60ad;
        border-left: 4px solid #3e60ad;
    }

    svg {
        margin-right: 1.5rem;
    }

    .svg-inline--fa {
        width: 1rem;
        height: 1rem;
        margin-top: 1px;
    }
`;

const ConfirmAlertBody = styled.div`
    font-family: inherit;
    text-align: center;
    border-radius: 2.5px;
    padding: 30px 40px;
    background: #fff;
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
    color: #666;
`;

const ConfirmHeader = styled.div`
    font-size: 1.3rem;
    color: #222;
    font-weight: 700;
    margin-bottom: 10px;
`;

const ConfirmAlertButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const AlertButton = styled.button`
    outline: none;
    border: none;
    border-radius: 2.5px;
    display: inline-block;
    padding: 10px 14px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    width: 80px;
    background: #3e60ad;

    color: #fff;
    letter-spacing: 0.5px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.15s opacity;

    &:hover {
        opacity: 0.8;
    }
`;
