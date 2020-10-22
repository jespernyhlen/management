import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <LoaderContainer>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </LoaderContainer>
    );
};

export default Loader;

const LoaderContainer = styled.p`
    display: flex;
    height: calc(100% - 7rem);
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    @keyframes blink {
        0% {
            opacity: 0.2;
        }

        20% {
            opacity: 1;
        }

        100% {
            opacity: 0.2;
        }
    }

    span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
    }

    span:nth-child(2) {
        animation-delay: 0.2s;
    }

    span:nth-child(3) {
        animation-delay: 0.4s;
    }
`;
