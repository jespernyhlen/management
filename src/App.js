import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';

// import Board from './Board';
// import Navbar from './Navbar';
import Routes from './Routes';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Layout from './layout/Layout';

// import './App.css';

function App() {
    return (
        <>
            <GlobalStyles />
            <ReactNotification />
            <Layout>
                <Routes />
            </Layout>

            {/* <Board /> */}
        </>
    );
}

export default App;
