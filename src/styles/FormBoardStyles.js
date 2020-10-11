import styled from 'styled-components';
import { devices } from './Devices';

export const Container = styled.div`
    position: relative;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 4px 0 30px;
`;

export const Title = styled.h2`
    color: #151515;
    font-weight: 700;
    text-transform: capitalize;
    font-size: 1.2rem;
`;

export const Form = styled.form`
    border-radius: 5px;

    input,
    textarea {
        height: 2.5rem;
        width: 100%;
        padding: 8px 12px;
        margin-bottom: 1rem;
        border: 1px solid #aaa;
        outline: 0;
        border-radius: 2.5px;
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.025);
        font-size: 0.9rem;
        &:focus {
            border-color: #111;
        }
    }

    textarea {
        height: auto;
    }

    label {
        font-weight: 600;
        color: #151515;
    }
`;

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
