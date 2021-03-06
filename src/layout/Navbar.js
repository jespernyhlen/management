import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { devices } from '../styles/Devices';
import {
    isAuthenticated,
    getAuthenticatedUser,
    removeAuthenticatedUser,
} from '../utils/Helpers';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

/* STYLES */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faTasks,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus,
    faUserFriends,
} from '@fortawesome/free-solid-svg-icons';

/* COMPONENTS */
import NavProfile from './NavProfile';

import { setIsInitialized } from '../actions';

const Nav = ({ history, setIsInitialized }) => {
    const [navOpen, setNavOpen] = useState();
    const currentPath = history.location.pathname;
    const isActive = (path) => {
        return currentPath === path ? 'nav-link active' : 'nav-link';
    };

    const logoutOptions = {
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
                            setIsInitialized(false);
                            removeAuthenticatedUser(() => {
                                history.push('/login');
                            });
                            onClose();
                        }}
                    >
                        Logout
                    </AlertButton>
                </ConfirmAlertButtonGroup>
            </ConfirmAlertBody>
        ),
        closeOnEscape: true,
        closeOnClickOutside: true,
    };

    const logoutButton = () => {
        return (
            <li className='nav-item'>
                <span
                    className='nav-link'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        confirmAlert(logoutOptions);
                    }}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />

                    {navOpen && 'Logout'}
                </span>
            </li>
        );
    };

    const listItem = (icon, path, name) => {
        return (
            <li className='nav-item' onClick={() => setNavOpen(false)}>
                <Link to={path} className={isActive(path)}>
                    <FontAwesomeIcon icon={icon} />
                    {navOpen && name}
                </Link>
            </li>
        );
    };

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const navList = () => {
        return (
            <>
                {listItem(faHome, '/', 'Home')}
                {!isAuthenticated() && (
                    <>
                        {listItem(faSignInAlt, '/login', 'Login')}
                        {listItem(faUserPlus, '/register', 'Register')}
                    </>
                )}
                {isAuthenticated() &&
                    getAuthenticatedUser().role === 'member' &&
                    listItem(faUser, '/private', 'Profile')}

                {isAuthenticated() && (
                    <>
                        {/* {listItem(faUserFriends, '/users', 'Members')} */}
                        {listItem(faTasks, '/trelloprivate', 'Board')}
                        {listItem(faUserFriends, '/teams', 'Teams')}

                        {logoutButton()}
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <Navbar className={!navOpen && 'nav-closed'}>
                <MenuButtonContainer>
                    <MenuButton
                        className={navOpen ? 'menu-btn open' : 'menu-btn'}
                        type='checkbox'
                        id='menu-btn'
                        onClick={() => toggleNav()}
                    />
                    <MenuIcon className='menu-icon' htmlFor='menu-btn'>
                        <span className='navicon'></span>
                    </MenuIcon>
                </MenuButtonContainer>
                <NavLogo>WEBTRELLO</NavLogo>

                {navOpen && isAuthenticated() && (
                    <NavProfile user={getAuthenticatedUser()} />
                )}
                {navOpen ? (
                    <NavList>{navList()}</NavList>
                ) : (
                    <NavListMobile>{navList()}</NavListMobile>
                )}
            </Navbar>
        </>
    );
};

const mapStateToProps = (state) => ({});

export default withRouter(
    connect(mapStateToProps, {
        setIsInitialized,
    })(Nav)
);

const MenuButtonContainer = styled.div`
    position: absolute;
    left: 3.75px;
    top: 5px;
    @media ${devices.tablet} {
        position: relative;
        right: 2.5px;
        left: 0;
        top: 0px;
    }
`;

const MenuButton = styled.input`
    display: none;
    &.open ~ .menu {
        max-height: 400px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
        padding-bottom: 20px;
    }

    &.open ~ .menu-icon .navicon {
        background: transparent;
    }

    &.open ~ .menu-icon .navicon:before {
        transform: rotate(-45deg);
    }

    &.open ~ .menu-icon .navicon:after {
        transform: rotate(45deg);
    }

    &.open ~ .menu-icon:not(.steps) .navicon:before,
    &.open ~ .menu-icon:not(.steps) .navicon:after {
        top: 0;
    }
`;

const MenuIcon = styled.label`
    cursor: pointer;
    display: inline-block;
    padding: 1rem;
    position: relative;
    user-select: none;
    margin: 10px 2.75px;
    .navicon {
        background: #fff;
        display: block;
        height: 2px;
        position: relative;
        transition: background 0.2s ease-out;
        width: 18px;
    }

    .navicon:before,
    .navicon:after {
        background: #fff;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        transition: all 0.2s ease-out;
        width: 100%;
    }

    .navicon:before {
        top: 5px;
    }

    .navicon:after {
        top: -5px;
    }

    @media ${devices.tablet} {
        float: right;
        margin: 0;
        padding: 10px 0;
        margin-right: 1.5rem;
    }
`;

const Navbar = styled.nav`
    background: #191a31;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    min-width: 220px;
    padding-top: 3.5rem;

    &.nav-closed {
        padding: 0;
        width: 4.5rem;

        min-width: auto;
        @media ${devices.tablet} {
            padding: 1.25rem 0;
            width: 100%;
            height: 4rem;
            position: absolute;
        }
    }
    @media ${devices.tablet} {
        padding: 1.25rem 0 1.25rem;
        width: 100%;
        position: absolute;
        z-index: 15;
    }
`;

const NavLogo = styled.p`
    display: none;
    color: #fff;
    font-weight: 600;
    letter-spacing: 1px;

    @media ${devices.tablet} {
        display: initial;
        margin-left: 1.5rem;
    }
`;

const NavList = styled.ul`
    max-width: 1260px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media ${devices.tablet} {
        margin-top: 2.5rem;
    }

    li {
        align-self: center;
        height: 100%;
        width: 100%;
        margin-top: 0.75rem;
        list-style: none;
    }

    a.nav-link,
    span.nav-link {
        outline: none;
        border: none;
        color: #8b8694;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        width: 100%;
        height: 40px;
        align-items: end;
        display: flex;
        padding: 12.5px 12.5px 30px;
        -webkit-transition: 0.2s;
        letter-spacing: 1px;
        font-weight: 400;
        padding-left: 1.5rem;
        transition: 0.1s;
    }
    a.nav-link:hover,
    span.nav-link:hover {
        color: #222;
        color: #ffffff;
        background: #2f2346;
        outline: none;
    }

    a.nav-link.active {
        color: #fff;
        background: #2f2346;
    }

    svg {
        margin-right: 1.25rem;
    }

    .svg-inline--fa {
        width: 1rem;
        height: 1rem;
        margin-top: 1px;
    }
`;

const NavListMobile = styled(NavList)`
    margin-top: 4.5rem;

    a.nav-link,
    span.nav-link {
        width: 100%;
        height: 40px;
        padding-left: 1.5rem;
    }

    svg {
        margin-right: 0;
    }
    @media ${devices.tablet} {
        display: none;
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
    padding: 0.75rem 1.75rem;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(180deg, #633ab7, #562aaf);
    color: #fff;
    letter-spacing: 0.5px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.15s opacity;

    &:hover {
        opacity: 0.8;
    }
`;
