import React from 'react'
import styled from 'styled-components'

function Wrapper() {
  return (
    <Container />
  )
}

export default Wrapper

const Container = styled.div`
  padding-top: var(--navbar-height);
  padding-left: var(--sidebar-width);
`