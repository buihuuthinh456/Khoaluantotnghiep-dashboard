import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Button from "@mui/material/Button";

import { Link, useSearchParams } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  fetchProducts,
  searchProduct,
} from "../features/products/productsSlice";

import {selectLogin} from "../features/login/loginSlice"
import { toast } from "react-toastify";

function Products() {
  const productList = useSelector(selectProducts).products;
  const isLoading = useSelector(selectProducts).isLoading;
  const user = useSelector(selectLogin)



  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
      dispatch(fetchProducts());
  }, []);

  const [isAdd, setIsAdd] = useState(false);
  const handleAddPage = () => {
    if(user.isLogin){
      setIsAdd(true);
    }
    else{
      toast.error(`You haven't login or You isn't admin`, {
        position: toast.POSITION.TOP_RIGHT,
        style:{fontSize:"1.6rem"}
      });
    }
  };

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );

  console.log(productList);
  return (
    <Container>
      {!isAdd? (
        <ProductCategory>
          <HeaderTitle>
            <h2>Product</h2>
            <ButtonAdd onClick={handleAddPage}>
              <AddIcon style={{ fontSize: 20 }}></AddIcon>
              <span>Add</span>
            </ButtonAdd>
          </HeaderTitle>

          <Content>
            <SearchField>
              <input
                placeholder="Search Product"
                type="text"
                name="name"
                onChange={(e) => {
                  setInput(e.target.value)
                  setSearchParams({'name[regex]':e.target.value})
                }}
                value={input}
              ></input>
              <Button
                onClick={() => {
                  const regex = searchParams.get('name[regex]')
                  console.log(regex)
                  dispatch(searchProduct(regex))
                  setInput('')
                }}
              >
                <SearchIcon
                  style={{ fontSize: 20, marginRight: 16 }}/>
              </Button>
              
            </SearchField>

            <ContentMenu>
              {productList.map((item) => (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ContentItem>
                    <ItemImage>
                      <img
                        key={item.images[0].public_id}
                        src={item.images[0].url}
                        alt=""
                      ></img>
                      <ItemInfo>
                        <Icon>
                          <ManageAccountsIcon />
                        </Icon>
                      </ItemInfo>
                    </ItemImage>
                    <ProductName>
                      <span>{item.name}</span>
                    </ProductName>
                  </ContentItem>
                </Link>
              ))}
            </ContentMenu>
          </Content>
        </ProductCategory>
      ) : (
        <AddProduct />
      )}
    </Container>
  );
}

export default Products;

const Container = styled.div`
  padding: 20px 36px;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductCategory = styled.div``;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--text-color);
  }
`;

const ButtonAdd = styled.button`
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

const Content = styled.div`
  margin-top: 36px;
`;

const SearchField = styled.div`
  margin-top: 24px;
  max-width: 300px;
  height: 36px;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 12px;

  input {
    font-size: 1.6rem;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
`;

const ContentMenu = styled.ul`
  margin-top: 24px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(210px, 1fr));
  grid-gap: 36px;
`;

const ItemInfo = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 500ms ease;
  cursor: pointer;
`;

const ContentItem = styled.li`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px,
    rgb(145 158 171 / 24%) 0px 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProductName = styled.div`
  margin-top: 16px;
  padding: 8px;

  span {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text-color);
  }
`;

const ItemImage = styled.div`
  width: 100%;
  height: 210px;
  position: relative;
  &:hover ${ItemInfo} {
    opacity: 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Icon = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
