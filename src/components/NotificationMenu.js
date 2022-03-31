import { AccessTime, Check } from '@material-ui/icons'
import { FadeIn } from '../GlobalState'
import React from 'react'
import styled from 'styled-components'

function NotificationMenu(props) {
  return (
    <Container onClick={(e)=>e.stopPropagation()}>
        <Notification>
            <NotiInfo>
                <h4>Notifications</h4>
                <p>You have 2 unread messages</p>
            </NotiInfo>

            <Mark>
                <CheckIcon />
            </Mark>
        </Notification>
        <Wrapper>
        <NewNoti>
            <h4>NEW</h4>
            <NewNotiList>
                <NewNotiItem>
                    <ImageWrap>
                        <img src='images/default-user-image.jpg' alt='..'></img>
                    </ImageWrap>

                    <NewNotiInfo>
                        <span>Your order is placed waiting for shipping</span>
                        <span>
                            <AccessTime  style={{"fontSize": "12px", "marginRight": "6px"}}/>
                            About 5 hours
                        </span>
                    </NewNotiInfo>
                </NewNotiItem>
                <NewNotiItem>
                    <ImageWrap>
                        <img src='images/default-user-image.jpg' alt='..'></img>
                    </ImageWrap>

                    <NewNotiInfo>
                        <span>Your order is placed waiting for shipping</span>
                        <span>
                            <AccessTime  style={{"fontSize": "12px", "marginRight": "6px"}}/>
                            About 5 hours
                        </span>
                    </NewNotiInfo>
                </NewNotiItem>
            </NewNotiList>
        </NewNoti>

        <BeforeNoti>
            <h4>Before That</h4>
            <BeforeThatList>
                <BeforeThatItem>
                    <ImageWrap>
                        <img src='images/default-user-image.jpg' alt='..'></img>
                    </ImageWrap>

                    <BeforeThatInfo>
                        <span>Your order is placed waiting for shipping</span>
                        <span>
                            <AccessTime  style={{"fontSize": "12px", "marginRight": "6px"}}/>
                            About 5 hours
                        </span>
                    </BeforeThatInfo>
                </BeforeThatItem>
            </BeforeThatList>
        </BeforeNoti>
        </Wrapper>
        <ViewAllButton>
            <button>View All</button>
        </ViewAllButton>
    </Container>
  )
}

export default NotificationMenu

const Container = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    min-width: 360px;
    border: 2px solid var(--hover-color);
    border-radius: 5px;
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px;
    transform-origin: top right;
    animation: ${FadeIn} 250ms ease;
`

const Notification = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--hover-color);
`

const Wrapper = styled.div`
    max-height: 60vh;
    overflow: hidden;
`

const NotiInfo = styled.div`
    h4 {
        margin-bottom: 8px;
    }

    p {
        font-size: 16px;
        color: var(--text-color);
        font-weight: 400;
    }
`

const Mark = styled.div`
    cursor: pointer;
`

const CheckIcon = styled(Check)`
    color: var(--primary-color);
`

const NewNoti = styled.div`
    padding: 8px 20px;

    h4 {
        margin-bottom: 8px;
        font-size: 12px;
        color: var(--text-color);
        font-weight: 500;
    }
`

const NewNotiList = styled.ul`
    list-style: none;
`

const NewNotiItem = styled.li`
    cursor: pointer;
    display:flex;
    align-items: center;
    padding: 12px 0;

    &:hover { 
        background-color: var(--hover-color);
    }
`

const ImageWrap = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 8px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const NewNotiInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    span:first-child {
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    span:last-child {
        font-size: 12px;
        font-weight: 300;
    }
`

const BeforeNoti = styled(NewNoti)`

`

const BeforeThatList = styled(NewNotiList)`

`

const BeforeThatItem = styled(NewNotiItem)`

`

const BeforeThatInfo = styled(NewNotiInfo)`

`
const ViewAllButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    button {
        cursor: pointer;
        color: var(--primary-color);
        width: 90%;
        padding: 8px;
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
