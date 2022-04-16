import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCategories,
  fetchCategories,
} from "../features/categories/categoriesSlice";

import {selectLogin} from '../features/login/loginSlice';

// MUI
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Component
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import FormCreateCategory from "../components/FormCreateCategory";


// Other
import { toast } from "react-toastify";

function Categories() {
  const [mounteAdd, setMounteAdd] = useState(false);
  const loginState = useSelector(selectLogin);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const columns = [
    { field: "id", headerName: "STT", width: 70 },
    {
      field: "name",
      headerName: "User",
      description: "UserName",
      sortable: false,
      width: 230,
      renderCell: (param) => {
        return (
          <CellWithImg>
            <span>{`${param.row.name}`}</span>
          </CellWithImg>
        );
      },
    },
    { field: "_id", headerName: "ID", width: 400 },
  ];

  const rows =
    categories.categories &&
    categories.categories.map((item, index) => ({
      ...item,
      id: index + 1,
    }));


    const handleSwitchPage = () => {
      if (loginState.isLogin && loginState.isAdmin) {
        setMounteAdd(state=>!state);
        // navigate("/create-product");
        console.log(123)
      } else {
        toast.error(`You haven't login or not admin`, {
          position: toast.POSITION.TOP_RIGHT,
          style: { fontSize: "1.6rem" },
        });
      }
    };

  if (categories.isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <Container>
      <Wrapper>
        <h2>Categories</h2>
        {!mounteAdd ? (
          <ButtonSwitchPage onClick={(e) => handleSwitchPage()}>
            <AddIcon style={{ fontSize: 20 }}></AddIcon>
            <span>Add</span>
          </ButtonSwitchPage>
        ) : (
          <ButtonSwitchPage onClick={(e) => handleSwitchPage()}>
            <ArrowBackIcon style={{ fontSize: 20 }}></ArrowBackIcon>
          </ButtonSwitchPage>
        )}
      </Wrapper>

      {!mounteAdd && rows && (
        <DataContainer>
          <DataGrid
            style={{ fontSize: 16 }}
            rows={rows}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </DataContainer>
      )}
      {mounteAdd&&<FormCreateCategory/>}
    </Container>
  );
}

export default Categories;

const Container = styled.div`
  position: relative;
  padding: 20px 36px;
  h2 {
    font-size: 2.6rem;
  }
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DataContainer = styled.div`
  margin-top: 24px;
  height: 600px;
  z-index: 1;
`;

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
    font-weight: 300;
  }
`;

const ButtonSwitchPage = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  padding: 8px 16px;
  background-color: var(--primary-color);
  border-radius: 50px;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 20px 40px;

  span {
    font-size: 1.6rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-left: 8px;
  }

  &:hover {
    opacity: 0.85;
  }
`;
