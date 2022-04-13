import React,{useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';


import {selectUsers,fetchUsers} from '../features/users/usersSlice';
import {useSelector, useDispatch} from 'react-redux'

import {selectLogin} from '../features/login/loginSlice';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
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
          <span>{`${param.row.firstName} ${param.row.lastName}`}</span>
        </CellWithImg>
      )
    }
  },
  { field: 'address', headerName: 'Address',type: 'text', width: 300},
  { field: 'contact', headerName: 'Contact Number', width: 300, sortable: false},
  { field: 'verify', headerName: 'Verify', width: 150}
];

const rows = [
  { id: 1,userImg:'images/default-user-image.jpg', lastName: 'Snow', firstName: 'Jon',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 2,userImg:'images/default-user-image.jpg', lastName: 'Lannister', firstName: 'Cersei',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 3,userImg:'images/default-user-image.jpg', lastName: 'Lannister', firstName: 'Jaime',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 4,userImg:'images/default-user-image.jpg', lastName: 'Stark', firstName: 'Arya',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 5,userImg:'images/default-user-image.jpg', lastName: 'Targaryen', firstName: 'Daenerys',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 6,userImg:'images/default-user-image.jpg', lastName: 'Melisandre', firstName: null, address: 'hello',contact: '0932697135', verify: 'true' },
  { id: 7,userImg:'images/default-user-image.jpg', lastName: 'Clifford', firstName: 'Ferrara',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 8,userImg:'images/default-user-image.jpg', lastName: 'Frances', firstName: 'Rossini',address: 'hello', contact: '0932697135', verify: 'true' },
  { id: 9,userImg:'images/default-user-image.jpg', lastName: 'Roxie', firstName: 'Harvey',address: 'hello', contact: '0932697135', verify: 'true' },
];

function User() {

  const data = useSelector(selectUsers)
  const token = useSelector(selectLogin).accessToken
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUsers(token))
  },[dispatch])

  if(data.isLoading) return <h1>Loading</h1>
  return (
    <Container>
      {console.log(data.users)}
      <h2>USER</h2>
      
      <DataContainer>
        <DataGrid
          style={{fontSize: 16}}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
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
