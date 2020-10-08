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
