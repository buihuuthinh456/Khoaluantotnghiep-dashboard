import React from 'react'
import { createGlobalStyle } from 'styled-components'

function GlobalState() {
  return (
    <GlobalStyle />
  )
}

export default GlobalState

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #00ab55;
  }
`;