import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.noMargin ? '0' : '15px')};
`;

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
    width: 100%;
    height: auto;
    transition: 0.2s;

    &:hover {
        filter: brightness(1.15);
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
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

export const HorisontalDots = styled.div`
    width: 13.5px;
    height: 13.5px;
    background-image: ${(props) =>
        props.light
            ? 'radial-gradient(circle, #fff 1.5px, #13131300 0.5px)'
            : 'radial-gradient(circle, #000 1.5px, #13131300 0.5px)'};
    background-size: 100% 33.33%;
    transform: rotate(90deg);
    position: absolute;
    right: ${(props) => (props.right ? props.right : '7.5px')};
    top: ${(props) => (props.top ? props.top : '5px')};
    cursor: pointer;
    z-index: 10;
    transition: 0.1s all;

    &:hover {
        background-image: radial-gradient(circle, #000 1px, #13131300 1.5px);
    }
`;
