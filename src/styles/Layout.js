import styled from 'styled-components';
import { devices } from './Devices';

export const PageNav = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    margin-bottom: 0.5rem;
    background: #fefefe;
    padding: 1rem 2.5rem 1rem 1.5rem;
    height: 4.25rem;

    @media ${devices.tabletSmall} {
        flex-direction: column;
        height: auto;
        align-items: start;
        padding: 1.25rem 1rem 1.25rem 1rem;
    }
`;

export const PageNavTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 500;

    @media ${devices.tabletSmall} {
        margin-bottom: 1rem;
    }
`;
