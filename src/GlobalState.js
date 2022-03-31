import React from 'react'
import { createGlobalStyle, keyframes } from 'styled-components'

function GlobalState() {
  return (
    <GlobalStyle />
  )
}

export default GlobalState

const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 92px;
    --primary-color: #00ab55;
    --hover-color: #f1f2f5;
    --sidebar-width: 275px;
    --text-color: #333;
    --border-color: ##e1e5e9;
  }
`;

export const FadeIn = keyframes`
    from {
        transform: scale(0);
        opacity: 0;
    } to {
        transform: scale(1);
        opacity: 1;
    }
`

