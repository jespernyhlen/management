import { createGlobalStyle } from 'styled-components';
import { devices } from './devices';

const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    font-size: 14px;
    box-sizing: border-box;

}



body {
    /* font-family: "Lato", sans-serif; */
    /* box-sizing: border-box; */
    /* letter-spacing: 0.5px; */
    background: linear-gradient(45deg, #e3e3ea, #fcfcff);
    min-height: 100vh;
    display: flex;
}



#root {
    width: 100%;
    word-break: break-word;
    background: linear-gradient(225deg, #fff, #ddd);;
    &.navigation-open {
        max-height: 100vh;
        overflow-y: hidden;
    }
}

main {
    min-height: calc(100vh - 3.5rem);
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${devices.tablet} {
        min-height: auto;

    }
}


.ReactModal__Overlay--after-open {
    background-color: #060606bf !important;
}

.react-confirm-alert-overlay {
    z-index: 100;
}

`;

export default GlobalStyles;
