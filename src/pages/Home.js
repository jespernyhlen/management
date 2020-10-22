import React from 'react';
import styled from 'styled-components';
import { devices } from '../styles/Devices';

const Home = ({ history }) => {
    return (
        <Wrapper>
            <Container>
                <HeaderText>Webtrello</HeaderText>
                <SubHeaderText>
                    Manage your time and get more done, collaboratively and by
                    yourself.
                </SubHeaderText>

                <Text>
                    Organize your tasks in an easy and structured way. Kankan
                    boards with drag and drop functionality.
                </Text>
            </Container>
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    height: 100%;
    background-image: linear-gradient(#2f0f6ded, #331965ed),
        url(https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    max-width: 600px;
    @media ${devices.tablet} {
        min-height: calc(100vh - 4rem);
    }
`;

const HeaderText = styled.h1`
    font-weight: 700;
    font-size: 5rem;
    letter-spacing: 1px;
    color: #fff;
    text-align: left;
    margin-top: 0;
    margin-bottom: 2rem;
    border-left: 5px solid #fff;
    padding-left: 2rem;

    @media ${devices.laptopSmall} {
        font-size: 3.6rem;
    }

    @media ${devices.tablet} {
        font-size: 3.5rem;
    }
`;

const SubHeaderText = styled.h2`
    color: #efefef;
    font-weight: 800;
    margin-bottom: 2rem;
    letter-spacing: 1px;

    @media ${devices.tablet} {
        font-size: 1.5rem;
    }
`;

const Text = styled.p`
    color: #eee;
    letter-spacing: 0.5px;
    font-size: 1rem;
    text-align: left;
`;
