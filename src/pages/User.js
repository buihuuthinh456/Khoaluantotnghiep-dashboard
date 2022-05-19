import React,{useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

import {useNavigate} from 'react-router-dom'


import {selectUsers,fetchUsers} from '../features/users/usersSlice';
import {useSelector, useDispatch} from 'react-redux'

import {selectLogin} from '../features/login/loginSlice';

import { toast } from "react-toastify";




// const rows = [
//   { id: 1,userImg:'images/default-user-image.jpg', lastName: 'Snow', firstName: 'Jon',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 2,userImg:'images/default-user-image.jpg', lastName: 'Lannister', firstName: 'Cersei',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 3,userImg:'images/default-user-image.jpg', lastName: 'Lannister', firstName: 'Jaime',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 4,userImg:'images/default-user-image.jpg', lastName: 'Stark', firstName: 'Arya',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 5,userImg:'images/default-user-image.jpg', lastName: 'Targaryen', firstName: 'Daenerys',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 6,userImg:'images/default-user-image.jpg', lastName: 'Melisandre', firstName: null, address: 'hello',contact: '0932697135', verify: 'true' },
//   { id: 7,userImg:'images/default-user-image.jpg', lastName: 'Clifford', firstName: 'Ferrara',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 8,userImg:'images/default-user-image.jpg', lastName: 'Frances', firstName: 'Rossini',address: 'hello', contact: '0932697135', verify: 'true' },
//   { id: 9,userImg:'images/default-user-image.jpg', lastName: 'Roxie', firstName: 'Harvey',address: 'hello', contact: '0932697135', verify: 'true' },
// ];

function User() {

  const data = useSelector(selectUsers)
  const token = useSelector(selectLogin).accessToken
  const isLogin = useSelector(selectLogin).isLogin

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!isLogin) {
      navigate('/login')
      toast.warning("You have to login",{
        style:{
          fontSize:'1.6rem',
        }
      })
    }
    else{
      dispatch(fetchUsers(token))
    }
  },[dispatch])

  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'user',
      headerName: 'User',
      description: 'UserName',
      sortable: false,
      width: 230,
      renderCell: (param) => {
        return (
          <CellWithImg>
            <img src={param.row.userImg} alt="user-img"></img>
            <span>{`${param.row.name}`}</span>
          </CellWithImg>
        )
      }
    },
    { field: 'isAdmin', headerName: 'Admin', width: 150},
    { field: 'email', headerName: 'Email', width: 300 },
  ];

  const rows = data.users.map((item,index)=>({
    ...item,id:index+1,userImg:'images/default-user-image.jpg'
  }))
  console.log(rows)

 

  if(data.isLoading) return (<h1>Loading</h1>)
  return (
    <Container>
      <h2>USER</h2>
      <DataContainer>
        <DataGrid
          style={{fontSize: '1.6rem'}}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          onRowClick={(e)=>console.log('user select', e.row)}
          // checkboxSelection
        />
      </DataContainer>

    </Container>
  )
}

export default User

const Container = styled.div`
  position: relative;
  padding: 20px 36px;
  h2 {
    font-size: 2.6rem;
  }
  z-index: 1;
`

const DataContainer = styled.div`
  margin-top: 24px;
  height: 600px;
  z-index: 1;
`

const CellWithImg = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  span {
    font-size: 1.6rem;
    color: var(--text-color);
    font-weight:300;
  }
`
