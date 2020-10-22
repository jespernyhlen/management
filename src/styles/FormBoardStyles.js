import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 4px 0 30px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
`;

export const Title = styled.h2`
    color: #151515;
    font-weight: 700;
    text-transform: capitalize;
    font-size: 1.2rem;
`;

export const Form = styled.form``;

export const ButtonTop = styled.button`
    padding: 0.25rem 0.5rem;
    background: transparent;
    border: 0;
    cursor: pointer;

    path {
        fill: #666;
    }

    &:hover {
        background: #e8e8e8;
    }
`;
