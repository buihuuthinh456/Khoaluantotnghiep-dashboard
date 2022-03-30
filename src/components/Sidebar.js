import React, { useState } from 'react'
import styled from 'styled-components'
import GlobalState from '../GlobalState'
import { Person, ShoppingCart, HowToReg } from '@material-ui/icons'

function Sidebar() {

    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(false)
    const [button3, setButton3] = useState(false)
    const [button4, setButton4] = useState(false)

    const handleClick = () => {
        setButton1(prev => !prev)   
    }
   return (
    <Container>
        <GlobalState />
        <Logo>TShop</Logo>

        <Wrapper>
            <UserInfo>
                <ImageWrap>
                    <img src='/images/default-user-image.jpg' alt='user-ava'></img>
                </ImageWrap>
                <span>Toàn Tôn</span>
            </UserInfo>
        </Wrapper>

        <SidebarList>
            <SidebarItem 
                isSelected={button1}
                onClick = {handleClick}
            >
                <Person />
                <span>User</span>
            </SidebarItem>

            <SidebarItem isSelected={button2}>
                <ShoppingCart />
                <span>Product</span>
            </SidebarItem>

            <SidebarItem isSelected={button3}>
                <LoginIcon>
                    <img src='images/outline_login_black_24dp.png' alt='login'></img>
                </LoginIcon>
                <span>Login</span>
            </SidebarItem>

            <SidebarItem isSelected={button4}>
                <HowToReg />
                <span>Register</span>
            </SidebarItem>
        </SidebarList>


    </Container>
  )
}

export default Sidebar

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    height: 100vh;
    z-index: 999;
    border-right: 1px solid #e1e5e9; 
`

const Logo = styled.h1`
    font-size: 36px;
    font-weight: 600;
    color: var(--primary-color);
    cursor: pointer;
    padding: 20px;
    margin: 0;
`

const Wrapper = styled.div`
    padding: 20px;
    height: 72px;
    margin-bottom: 36px;
`

const UserInfo = styled.div`
    cursor: pointer;
    width: 100%;
    padding: 16px 20px;
    background-color: #edeff2;
    border-radius: 10px;
    display: flex;
    align-items: center;

    span {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1.1;
        color: #353e49;
    }
`

const ImageWrap = styled.div`
    height: 40px;
    border-radius: 50%;
    margin-right: 16px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    };
`

const SidebarList = styled.ul`
    margin-top: 60px;
    padding-left: 0;
    list-style: none;
`   

const SidebarItem = styled.li`
    cursor: pointer;
    padding: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    margin: 12px 0;
    ${state=>state.isSelected ? `
        color: var(--primary-color);
        border-right: 4px solid var(--primary-color);
        background-color: #f1f2f5;   
    `: ''}
    
    &:hover {
        background-color: #f1f2f5;
    }
    
    span {
        margin-left: 16px;
        font-size: 14px;
        font-weight: 400;
    }
`

const LoginIcon = styled.div`
    width: 24px;
    height: 24px;

    img {
        width:100%;
        height: 100%;
        object-fit: cover;
    }
`