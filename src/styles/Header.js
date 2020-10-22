import styled from 'styled-components';
import { devices } from './Devices';

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    background: #fff;
    padding: 1rem 2rem;
    height: 4.5rem;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #e2e2e2;

    @media ${devices.tabletSmall} {
        border-top: 1px solid #1b1b1b;
        flex-direction: column;
        height: auto;
        align-items: start;
        padding: 1.5rem 1.25rem 1.25rem;
        /* padding: 1.25rem 1rem 1.25rem 1rem; */
    }
`;

export const HeaderTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 400;
    color: #555;

    b {
        font-weight: 500;
        color: #000;
    }

    @media ${devices.tabletSmall} {
        margin-bottom: 0.25rem;
        font-size: 1rem;
    }
`;
