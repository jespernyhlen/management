import styled from 'styled-components';

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.noMargin ? '0' : '15px')};
`;

export const Button = styled.button`
    outline: none;
    border: none;
    background: ${(props) => (props.bgColor ? props.bgColor : 'blue')};
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 10px 30px;
    letter-spacing: 0.5px;
    box-shadow: ${(props) =>
        props.btnType === 'main'
            ? '2px 5px 10px rgba(0, 0, 0, 0.2)'
            : '1px 3px 7.5px rgba(0, 0, 0, 0.1)'};
    width: 100%;
    height: ${(props) => (props.height ? props.height : '35px')};
    border-radius: 2.5px;
    transition: 0.2s;

    &:hover {
        filter: brightness(1.15);
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const HorisontalDots = styled.div`
    width: 13.5px;
    height: 13.5px;
    background-image: radial-gradient(circle, #000 1.5px, #13131300 0.5px);
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

// const Button = styled.button`
//     font-size: 0.9rem;
//     cursor: pointer;
//     text-align: center;
//     opacity: 1;
//     border-radius: 2.5px;
//     padding: 10px 14px;
//     letter-spacing: 0.5px;
//     font-weight: 600;
//     color: #fff;
//     border: 0;
//     background: #3e60ad;
//     box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.2);

//     transition: 0.1s all;

//     &:hover {
//         opacity: 0.9;
//     }

//     &:disabled {
//         opacity: 0.5;
//         cursor: default;
//     }
// `;
