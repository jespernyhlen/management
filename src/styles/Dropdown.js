import styled from 'styled-components';

export const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 7.5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 2.5px;
    position: absolute;
    z-index: 11;
    top: 1.25rem;
    right: 0;
    width: calc(100% + 2.5px);
    max-width: 175px;
    height: auto;
    padding: 0.75rem 0;
`;

export const DropdownItem = styled.a`
    color: #666;
    padding: 0.5rem 1rem;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.05s all;

    &:hover {
        background: #ddd;
        color: #222;
        text-decoration: none;
        cursor: pointer;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;

    .larger {
        font-size: larger;
    }
`;