import React from 'react'
import styled from 'styled-components'
import GlobalState from './GlobalState'
import { Person, ShoppingCart, Login  } from '@material-ui/icons'


function Sidebar() {
  return (
    <Container>
        <GlobalState />
        <Logo>TShop</Logo>

        <UserInfo>
            <ImageWrap>
                <img src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg' alt='user-ava'></img>
            </ImageWrap>
            <span>Toàn Tôn</span>
        </UserInfo>

        <SidebarList>
            <SidebarItem>
                <Person />
                <span>User</span>
            </SidebarItem>

            <SidebarItem>
                <ShoppingCart />
                <span>Product</span>
            </SidebarItem>

            <SidebarItem>
                <img src='/images/default-user-image.jpg' alt='login'></img>
                <span>Dashboard</span>
            </SidebarItem>

            <SidebarItem>
                <span>Dashboard</span>
            </SidebarItem>

            <SidebarItem>
                <span>Dashboard</span>
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
    width: 275px;
    height: 100vh;
    padding: 20px;
    z-index: 999;
    border-right: 1px solid #e1e5e9; 
`

const Logo = styled.h1`
    font-size: 36px;
    font-weight: 600;
    color: var(--primary-color);
`

const UserInfo = styled.div`
    cursor: pointer;
    width: 100%;
    height: 72px;
    padding: 16px 20px;
    background-color: #edeff2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 36px;

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
    padding-left: 0;
    list-style: none;
`   

const SidebarItem = styled.li`

`