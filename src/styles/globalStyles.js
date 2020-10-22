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
    /* font-family: "Lato", sans-serif;
    font-family: 'Source Sans Pro', sans-serif; */
    letter-spacing: 0.25px;
    /* box-sizing: border-box; */
    /* letter-spacing: 0.5px; */
    background: linear-gradient(45deg, #e3e3ea, #fcfcff);
    min-height: 100vh;
    display: flex;
}



#root {
    width: 100%;
    word-break: break-word;
    background: linear-gradient(225deg,#F6F7FA,#f6f6f9);
    
    &.navigation-open {
        max-height: 100vh;
        overflow-y: hidden;
    }
    display: flex;

    @media ${devices.tablet} {
        flex-direction: column;
    }

}

main {
    overflow: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* justify-content: center; */
    width: inherit;

    @media ${devices.tablet} {
        width: auto;
        margin-top: 4rem;
    }
}


.ReactModal__Overlay--after-open {
    background-color: #060606bf !important;
    z-index: 200;
}

.react-confirm-alert-overlay {
    z-index: 100;
    background-color: #060606bf !important;
}

form {
    margin-bottom: 1.75rem;
}

`;

export default GlobalStyles;
