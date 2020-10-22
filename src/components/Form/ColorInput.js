import React from 'react';
import styled from 'styled-components';

function ColorInput({ checkedColor, color, handleChange }) {
    return (
        <InputContainer className='color' style={{ backgroundColor: color }}>
            <input
                type='radio'
                name='color'
                value={color}
                checked={checkedColor === color}
                onChange={handleChange}
            />
            <i className='checkbox-icon'></i>
        </InputContainer>
    );
}

export default ColorInput;

const InputContainer = styled.div`
    &.color,
    &.color input {
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 30px;
        border-radius: 2.5px;
    }

    &.color {
        display: inline-block;
        margin: 3px 3px 3px 0;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }

    &.color input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 2;
        cursor: pointer;
    }

    &.color i {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-image: url(http://cdn.nicolapps.ch/images/uploads/1478199301.png);
        background-size: 25px;
        background-repeat: no-repeat;
        background-position: center center;
        opacity: 0;
        transition: 0.15s opacity ease-in-out;
    }

    &.color input:checked + i {
        opacity: 1;
    }
`;
