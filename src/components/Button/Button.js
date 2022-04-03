import React from 'react'
import styled from 'styled-components';

function Button(props) {

    const Button = styled.button`
        color:${props.color||'#fff'};
        font-size: ${props.fontSize||'1.6rem'};
        display: flex;
        justify-content: center;
        align-items: center;
        padding: ${props.size&&props.size==='small'?'8px 12px':'12px 16px'};
        width: ${props.width||''};
        max-width:${props.maxWidth||''};
        background-color:${props.bgColor||''};
        margin: ${props.margin||'auto'};
        border:none;
        border-radius: 4px;
        cursor: pointer;

        :hover{
            opacity: 0.8;
        }
    `
  return (
    <Button {...props} >{props.children}</Button>
  ) 
}

export default Button