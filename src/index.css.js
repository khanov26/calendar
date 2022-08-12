import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --base-color: #030303;
    --accent-color: #FF3131;
    --event-color: #EBECFF;
    --selected-event-color: #B3B7FF;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    color: var(--base-color);
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .hidden-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
