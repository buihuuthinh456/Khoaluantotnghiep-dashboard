import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {selectCategories,fetchCategories} from '../features/categories/categoriesSlice';

import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';

import Modal from '../components/Modal';
import Loading from '../components/Loading';


function Categories() {


  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  useEffect(()=>{
    dispatch(fetchCategories())
  },[])


  const columns = [
    { field: 'id', headerName: 'STT', width: 70 },
    {
      field: 'name',
      headerName: 'User',
      description: 'UserName',
      sortable: false,
      width: 230,
      renderCell: (param) => {
        return (
          <CellWithImg>
            <span>{`${param.row.name}`}</span>
          </CellWithImg>
        )
      }
    },
  ];

  const rows = categories.categories&&categories.categories.map((item,index)=>({
    ...item,id:index
  }))

  if(categories.isLoading) return <Modal><Loading/></Modal>
  return (
    <Container>
      {console.log(categories)}
      <h2>Categories</h2>
      
      {rows&&
      <DataContainer>
        <DataGrid
          style={{fontSize: 16}}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </DataContainer>}

    </Container>
  )
}

export default Categories


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