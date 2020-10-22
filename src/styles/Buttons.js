import styled from 'styled-components';

import { devices } from './Devices';

export const Button = styled.button`
    outline: none;
    box-shadow: 0 4px 16px rgba(82, 45, 169, 0.24);
    background: ${(props) =>
        props.bgColor
            ? props.bgColor
            : 'linear-gradient(180deg, #633ab7, #562aaf)'};
    border-radius: 2px;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.75px;
    padding: 1rem 2rem;
    width: fit-content;
    min-width: 125px;
    height: auto;
    text-transform: capitalize;
    transition: 0.2s;

    &:hover {
        filter: brightness(1.15);
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    @media ${devices.tabletSmall} {
        margin: 1rem 0 0;
        margin: 0;

        font-size: 12px;
        padding: 1rem 1.5rem;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    ${Button} {
        margin-left: 0.5rem;

        @media ${devices.tabletSmall} {
            margin: 1rem 0.5rem 0 0;
            margin: 0 0.5rem 0 0;
        }
    }
`;

export const DropdownButton = styled.div`
    width: 13.5px;
    height: 13.5px;
    background-image: ${(props) =>
        props.light
            ? 'radial-gradient(circle, #fff 1.5px, #13131300 0.5px)'
            : 'radial-gradient(circle, #000 1.5px, #13131300 0.5px)'};
    background-size: 100% 33.33%;
    transform: rotate(90deg);
    position: absolute;
    right: ${(props) => (props.type === 'header' ? '12.5px' : '7.5px')};
    top: ${(props) => (props.type === 'header' ? '10px' : '5px')};
    cursor: pointer;
    z-index: 10;
    transition: 0.1s all;

    &:hover {
        background-image: ${(props) =>
            props.light
                ? 'radial-gradient(circle, #ddd 1.5px, #13131300 0.5px)'
                : 'radial-gradient(circle, #666 1.5px, #13131300 0.5px)'};
    }
`;

export const DropdownButtonSolid = styled.div`
    box-shadow: 0 4px 16px rgba(82, 45, 169, 0.24);
    background: ${(props) =>
        props.bgColor
            ? props.bgColor
            : 'linear-gradient(180deg, #633ab7, #562aaf)'};
    border-radius: 2px;
    padding: 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.1s all;

    &:hover {
        filter: brightness(1.15);
    }

    ${DropdownButton} {
        position: relative;
        right: auto;
        top: auto;
        background-image: radial-gradient(circle, #fff 1.5px, #13131300 0.5px);
    }

    @media ${devices.tabletSmall} {
        margin-left: 0;
    }
`;

// export const Button = styled.button`
//     outline: none;
//     border: none;
//     background: ${(props) => (props.bgColor ? props.bgColor : 'blue')};
//     color: #fff;
//     font-size: 0.9rem;
//     font-weight: 500;
//     padding: 10px 30px;
//     letter-spacing: 0.5px;
//     box-shadow: ${(props) =>
//         props.btnType === 'main'
//             ? '2px 5px 10px rgba(0, 0, 0, 0.2)'
//             : '1px 3px 7.5px rgba(0, 0, 0, 0.1)'};
//     width: 100%;
//     height: ${(props) => (props.height ? props.height : '35px')};
//     border-radius: 2.5px;
//     transition: 0.2s;

//     &:hover {
//         filter: brightness(1.15);
//     }

//     &:disabled {
//         opacity: 0.5;
//         cursor: default;
//     }
// `;
