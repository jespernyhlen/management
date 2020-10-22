import styled, { css } from 'styled-components';
import { devices } from './Devices';

export const baseInputStyles = css`
    padding: 7px 0;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 100%;
    box-shadow: none;
    outline: none;
    border: none;
`;

export const ContentContainer = styled.div`
    padding: 80px;
    position: absolute;
    margin: 0 auto;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 10;
    color: #fff;

    @media ${devices.laptop} {
        padding: 40px;
    }

    @media ${devices.mobile} {
        padding: 40px 20px;
    }
`;

export const Content = styled.div`
    margin: 0 auto;
`;

export const HeaderText = styled.h2`
    font-size: 2.5rem;
    font-weight: 100;
    margin-bottom: 25px;

    @media ${devices.laptopSmall} {
        font-size: 2rem;
    }

    @media ${devices.mobile} {
        font-size: 1.5rem;
    }

    span {
        background: #45b791;
        padding: 0 40px 0 10px;
        font-weight: 600;
        font-size: 4.2rem;

        @media ${devices.laptopSmall} {
            font-size: 3.3rem;
        }

        @media ${devices.tablet} {
            font-size: 3rem;
        }

        @media ${devices.mobile} {
            font-size: 2.5rem;
            padding: 0 20px 0 10px;
        }
    }
`;

export const TextContent = styled.p`
    color: #ddd;
    font-weight: 100;
    margin-bottom: 20px;
`;

// Style for container with Form and content
export const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 2.5px;
    box-shadow: 0 5px 50px rgba(0, 0, 0, 0.05);

    @media ${devices.tablet} {
        width: 100%;
    }
`;

export const FormContent = styled.div`
    padding: 30px;
    max-width: 450px;
    margin: 0 auto;
    height: calc(100% - 7.5rem);
    justify-content: center;
    display: flex;
    flex-direction: column;
    form {
        div {
            position: relative;
        }
    }

    @media ${devices.laptop} {
        padding: 40px;
    }

    @media ${devices.laptopSmall} {
        height: calc(100vh - 9rem);
    }

    @media ${devices.mobile} {
        padding: 40px 20px;
    }
`;

export const FormHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const FormHeaderText = styled.h1`
    margin: 0 0 1.25rem;
    color: #222;
    text-align: center;

    @media ${devices.mobile} {
        font-size: 2rem;
    }
`;

export const FormGroup = styled.div`
    position: relative;
    padding: 15px 0 0;
    width: 100%;

    input:not(:placeholder-shown) ~ label {
        padding-top: 0;
        padding-bottom: 0;
        color: #777;
        font-size: 0.8rem;
    }

    input:-webkit-autofill ~ label {
        font-size: 0.8rem;
        padding-top: 0;
        padding-bottom: 0;
        color: #777;
    }
`;

export const Label = styled.label`
    position: absolute;
    top: 0;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: 0.2s;
    color: #aaa;

    @media ${devices.mobile} {
        font-size: 0.7rem;
    }

    svg {
        /* margin-top: -0.1rem; */
        width: 0.9rem;
        height: 0.75rem;
    }
`;

export const InputFieldWithLabel = styled.input`
    ${baseInputStyles}
    height: 2.5rem;
    width: 100%;
    padding: 8px 12px;
    outline: 0;
    border-radius: 2.5px;
    font-size: 0.9rem;
    background: #f7f7f7;
    border: 1px solid gainsboro;
    transition: all 0.2s;

    &:-internal-autofill-selected {
        font-family: 'Lato', sans-serif;
        background-color: #f7f7f7 !important;
        box-shadow: 0 0 0 50px #f7f7f7 inset;
        -webkit-box-shadow: 0 0 0 50px #f7f7f7 inset;
    }
    &:-webkit-autofill::first-line {
        font-family: 'Lato', sans-serif;
    }

    &::placeholder {
        color: transparent;
    }

    &:placeholder-shown ~ ${Label} {
        cursor: text;
        top: 30px;
        left: 10px;
        display: flex;
        align-items: center;
        pointer-events: none;
    }

    &:focus {
        ~ ${Label} {
            position: absolute;
            transition: 0.2s;
            color: #2c3a5a;
            font-size: 0.8rem;
            left: 0;
            top: 0;
        }
        border: 1px solid #2c3a5a;
        background: #fff;
    }

    &:hover {
        background: #fff;
    }

    &.read-only {
        border: 0;
        background: #ffffff;
        padding-left: 0;
        cursor: initial;
    }
`;

export const TextWithLink = styled.div`
    color: #666;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 7.5px;

    a {
        margin-left: 5px;
        color: #2c3a5a;
        font-weight: bold;
    }
`;

export const TextLine = styled.p`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgb(130 130 130);
    line-height: 0.1em;
    margin: 15px 0px 20px;

    span {
        text-transform: capitalize;
        background: rgb(255, 255, 255);
        padding: 0px 10px;
        font-size: 0.9rem;
        letter-spacing: 1px;
    }
`;

// Shared button style

// export const ButtonContainer = styled.div`
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 15px;
// `;

// export const Button = styled.button`
//     ${baseInputStyles}
//     padding: 12.5px 0;
//     background: ${(props) => (props.bgColor ? props.bgColor : 'blue')};
//     color: #fff;
//     font-size: ${(props) => (props.btnType === 'main' ? '0.9rem' : '1rem')};
//     font-weight: 700;
//     letter-spacing: 0.5px;
//     box-shadow: ${(props) =>
//         props.btnType === 'main'
//             ? '2px 5px 10px rgba(0, 0, 0, 0.2)'
//             : '1px 3px 7.5px rgba(0, 0, 0, 0.1)'};
//     width: ${(props) => (props.btnType === 'main' ? '100%' : '48%')};
//     height: 50px;
//     border-radius: 2.5px;
//     transition: 0.2s;

//     &:hover {
//         filter: brightness(1.15);
//     }
// `;
