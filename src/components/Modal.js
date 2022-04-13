import React from 'react';
import styled from 'styled-components'

function Modal({children}) {
  return (
    <Container>{children}</Container>
  )
}


const Container = styled.div`
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:var(--sidebar-width);
    left:0;


    /* background-color: rgba(0,0,0,0.8); */

    display: flex;
    justify-content: center;
    align-items: center;
`

export default Modal