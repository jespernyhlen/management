import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { setWidth } from './actions';

import Routes from './Routes';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Layout from './layout/Layout';

function App({ setWidth }) {
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        console.log(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    useEffect(() => {
        handleWindowResize();
    }, []);

    return (
        <>
            <GlobalStyles />
            <ReactNotification />
            <Layout>
                <Routes />
            </Layout>
        </>
    );
}

const mapStateToProps = (state) => ({});

export default withRouter(
    connect(mapStateToProps, {
        setWidth,
    })(App)
);
