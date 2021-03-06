import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Badge } from '@material-ui/core'
import { Search, Notifications, Home, Person, Settings } from '@material-ui/icons'
import NotificationMenu from './NotificationMenu'
import { FadeIn } from '../GlobalState'
import { selectLogin } from '../features/login/loginSlice'
import { useSelector } from 'react-redux'


function Header() {

    const loginState = useSelector(selectLogin)
    const [isLogin, setIsLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    useEffect(()=>{
        setUserInfo(loginState.info)
        setIsLogin(state => state = loginState.isLogin)
    }, [loginState.isLogin])

    console.log(loginState);

    const [userBox,setUserBox] = useState(false)
    const [notiBox,setNotibox] = useState(false)

    const handleOpenUser = () => {
        if(userBox) {
            setUserBox(false)
        } else {
            setUserBox(true)
        }
    }

    // close Div user
    const userRef = useRef()
    useEffect(()=> {
        const handler = e => {
            if(!userRef.current.contains(e.target)) {
                setUserBox(false)
            }
        }   
        window.addEventListener("mousedown", handler)
        return () => {
            window.removeEventListener("mousedown", handler)
        }
    })

    // close Div noti

    const notiRef = useRef()
    useEffect(()=>{
        const handler = (e) => {
            if(!notiRef.current.contains(e.target)) {
                setNotibox(false)
            }
        }
        window.addEventListener("mousedown", handler)

        return () => {
            window.removeEventListener("mousedown", handler)
        }
    })

  return (
    <Container>
        {/* <SearchContainer>
            <SearchIcon />
            <input type='text'></input>
        </SearchContainer> */}

        <Controller>
            {/* <Notification ref={notiRef}  onClick={()=>setNotibox(state => !state)}>
                <Badge badgeContent={2} color="secondary">
                    <NotificationIcon style={{ fontSize: 24 }}/>
                </Badge>

                {notiBox && <NotificationMenu>
                    
                </NotificationMenu>}

            </Notification> */}

            <UserIcon ref={userRef} onClick={handleOpenUser}>
                <img src='/images/default-user-image.jpg' alt='user-ava'></img>
                {userBox && 
                    <UserMenu  onClick={(e)=>e.stopPropagation()}>
                        <UserInfo>
                            <p>{userInfo.name}</p>
                            <p>{userInfo.email}</p>
                        </UserInfo>

                        <UserController>
                            <UserControllerItem>
                                <Home />
                                <span>Home</span>
                            </UserControllerItem>
                            <UserControllerItem>
                                <Person />
                                <span>User</span>
                            </UserControllerItem>
                            <UserControllerItem>
                                <Settings />
                                <span>Settings</span>
                            </UserControllerItem>
                        </UserController>

                        <LogoutButton>
                            <button>Logout</button>
                        </LogoutButton>
                    </UserMenu>
                }                
            </UserIcon>

        </Controller>
    </Container>
  )
}

export default Header

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-left: calc(var(--sidebar-width) + 36px);
    padding-right: 36px;
    height: 92px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    background-color: #f9fafb;
    z-index: 100;  
`

const SearchIcon = styled(Search)`

`

const SearchContainer = styled.div`
    width: 350px;
    height: 48px;
    border: 1px solid gray;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 12px;

    ${SearchIcon} {
        margin-right: 8px;
    }

    input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
    }
`

const Controller = styled.div`
    display: flex;
    align-items: center;
`

const NotificationIcon = styled(Notifications)`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    color: gray;
`

const Notification = styled.div`
    position: relative;
    border-radius: 50%;
    
    &:hover {
        ${NotificationIcon} {
            color: var(--primary-color);
        }
    }
`

const UserIcon = styled.div`
    margin-left: 36px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    z-index: 100;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }

    &:hover {
        box-shadow: 0px 5px 10px var(--hover-color);
    }
`

const UserMenu = styled.div`
    background-color: white;
    position: absolute;
    top: 50px;
    right: 0;
    min-width: 220px;
    border: 2px solid var(--hover-color);
    border-radius: 5px;
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px;
    transform-origin: top right;
    animation: ${FadeIn} ease 250ms;
    z-index: 100;
`

const UserInfo = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid #e1e5e9;
    p:first-child {
        font-size: 16px;
        font-weight: 400;
        color: var(--text-color);
        margin: 0;
        margin-bottom: 8px;
    }

    p:last-child {
        font-size: 14px;
        font-weight: 300;
        margin: 0;
    }
`

const UserController = styled.ul`
    list-style: none;
    padding: 0 20px;
    margin-bottom: 12px;
`

const UserControllerItem = styled.li`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px 0;

    &:hover {
        background-color: var(--hover-color);
    } 

    span {
        margin-left: 16px;
        font-size: 14px;
        font-weight: 400;
        color: var(--text-color);
    }
`

const LogoutButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    button {
        cursor: pointer;
        padding: 8px 52px;
        background-color: white;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 1.1px;
        border: 1px solid #c5cbed;
        border-radius: 10px;

        &:hover {
            background-color: var(--hover-color)
        }
    }
`



