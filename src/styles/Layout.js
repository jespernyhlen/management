import styled from 'styled-components';
import { devices } from './Devices';

export const PageNav = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    background: linear-gradient(215deg, #3f51b5, #3f51b5);
    padding: 1rem 2rem;
    height: 10rem;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);

    @media ${devices.tabletSmall} {
        flex-direction: column;
        height: auto;
        align-items: start;
        padding: 1.25rem 1rem 1.25rem 1rem;
    }
`;

export const PageNavTitle = styled.h3`
    color: #fff;
    font-size: 2rem;
    font-weight: 100;
    b {
        font-weight: 500;
        font-size: 2rem;
    }

    @media ${devices.tabletSmall} {
        margin-bottom: 1rem;
    }
`;
