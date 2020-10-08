import React from 'react';
import { withRouter } from 'react-router-dom';
import Nav from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <main>{children}</main>
        </>
    );
};

export default withRouter(Layout);
