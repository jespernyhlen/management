import React from 'react';
import styled from 'styled-components';
import { devices } from '../styles/Devices';

const Home = ({ history }) => {
    return (
        <>
            <Container>
                <HeaderText>Management Boilerplate</HeaderText>

                <Text>
                    Authentication via Facebook/Google and server-side
                    registration
                    <br />
                    <br />
                    MongoDB, Express, React and Node.js
                </Text>
            </Container>
        </>
    );
};

export default Home;

const Container = styled.div`
    @media ${devices.tablet} {
        min-height: calc(100vh - 3.5rem);
    }
`;

const HeaderText = styled.h1`
    width: fit-content;
    background: #5595da;
    padding: 20px 40px;
    font-weight: 600;
    font-size: 4.2rem;
    margin: 0 auto 40px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
    color: #fff;
    text-align: center;

    @media ${devices.laptopSmall} {
        font-size: 3.6rem;
    }

    @media ${devices.tablet} {
        font-size: 3rem;
        padding: 20px;
    }

    @media ${devices.mobile} {
        font-size: 2.5rem;
    }
`;

const Text = styled.p`
    letter-spacing: 1px;
    font-size: 1rem;
    text-align: center;
`;
