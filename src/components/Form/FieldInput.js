import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

const FieldInput = ({ values }) => {
    const {
        name,
        label,
        type,
        value,
        handleChange,
        placeholder,
        icon,
    } = values;

    let inputLabel = <label htmlFor={name}>{label}</label>;

    if (values.textArea) {
        return (
            <>
                <SectionTitle>
                    {icon && <FontAwesomeIcon icon={icon} />}
                    {inputLabel}
                </SectionTitle>
                <TextArea
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </>
        );
    }

    return (
        <>
            <SectionTitle>
                {icon && <FontAwesomeIcon icon={icon} />}
                {inputLabel}
            </SectionTitle>
            <Input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </>
    );
};

export default FieldInput;

const SectionTitle = styled.label`
    color: #222;
    font-size: 1rem;
    font-weight: 600;
    height: 1rem;
    margin-bottom: 0.75rem;

    svg {
        margin-right: 0.75rem;
        font-size: 0.825rem;
        margin-bottom: 0.05rem;
    }
`;

const BaseInput = css`
    height: 2.5rem;
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 1rem;
    outline: 0;
    border-radius: 2.5px;
    border: 1px solid gainsboro;
    font-size: 0.9rem;
    background: #f7f7f7;
    transition: 0.1s all;

    &:hover {
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.025);
        border: 1px solid #cecece;
        background: #fff;
    }
    &:focus {
        border-color: #222;
        background: #fff;
    }
`;

const Input = styled.input`
    ${BaseInput};
`;

const TextArea = styled.textarea`
    ${BaseInput};
    height: auto;
    overflow: hidden;
    height: 60px;
    background: #f7f7f7;
`;
