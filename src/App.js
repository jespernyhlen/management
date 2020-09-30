import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import Navbar from './Navbar';

import './App.css';

function App() {
    return (
        <Container>
            <Navbar />
            <Board />
        </Container>
    );
}

export default App;

const Container = styled.div``;
