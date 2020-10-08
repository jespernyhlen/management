import { createGlobalStyle } from 'styled-components';
import { devices } from './Devices';

const GlobalStyles = createGlobalStyle`

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-bottom: 0;
}

html {
    font-size: 14px;
    box-sizing: border-box;

}



body {
    font-family: "Lato", sans-serif;
    letter-spacing: 0.5px;
    /* box-sizing: border-box; */
    /* letter-spacing: 0.5px; */
    background: linear-gradient(45deg, #e3e3ea, #fcfcff);
    min-height: 100vh;
    display: flex;
}



#root {
    width: 100%;
    word-break: break-word;
    background: linear-gradient(225deg,#F6F7FA,#ECEDF5);
    &.navigation-open {
        max-height: 100vh;
        overflow-y: hidden;
    }
    display: flex;

}

main {
    min-height: calc(100vh - 3.5rem);
    width: 100%;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */

    @media ${devices.tablet} {
        min-height: auto;

    }
}


.ReactModal__Overlay--after-open {
    background-color: #060606bf !important;
    z-index: 10;
}

.react-confirm-alert-overlay {
    z-index: 100;
    background-color: #060606bf !important;
}

`;

export default GlobalStyles;
