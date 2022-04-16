import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Button from "@mui/material/Button";

import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  fetchProducts,
  searchProduct,
} from "../features/products/productsSlice";

import { selectLogin } from "../features/login/loginSlice";
import { toast } from "react-toastify";

// MUI Component
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import Stack from "@mui/material/Stack";

function Products() {
  const productList = useSelector(selectProducts).products;
  const categories = useSelector(selectProducts).category;
  const isLoading = useSelector(selectProducts).isLoading;
  const totalPageValue = useSelector(selectProducts).totalPage;
  const [totalPage, setTotalPage] = useState(totalPageValue);
  const user = useSelector(selectLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAdd, setIsAdd] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  let [searchInfo, setSearchInfo] = useState({
    page: 1,
    limit:12,
    "price[gt]": undefined,
    "price[gte]": undefined,
    "price[lt]": undefined,
    "price[lte]": undefined,
    "name[regex]": undefined,
    "category[regex]": undefined,
    "sort":undefined,
  });

  // Lấy state => Ghi đè
  // Lọc undefined
  // Set searchParam
  // Dispatch ( call api)

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setTotalPage(totalPageValue);
  }, [totalPageValue]);

  const handleChange = (event, value) => {
    setSearchInfo((state) => {
      const param = { ...state, page: value };
      Object.keys(param).forEach((key) => {
        return (
          (param[key] === undefined || param[key] == false) && delete param[key]
        );
      });
      setSearchParams(param);
      dispatch(searchProduct(param));

      return { ...state, page: value };
    });
  };

  const handleAddPage = () => {
    if (user.isLogin) {
      setIsAdd(true);
      // navigate("/create-product");
      console.log(123)
    } else {
      toast.error(`You haven't login`, {
        position: toast.POSITION.TOP_RIGHT,
        style: { fontSize: "1.6rem" },
      });
    }
  };

  const handleFilter = (e) => {
    const category = e.dataset.category;

    setSearchInfo((state) => {
      const param = { ...state, "category[regex]": category, page: 1 };
      Object.keys(param).forEach((key) => {
        return (
          (param[key] === undefined || param[key] == false) && delete param[key]
        );
      });
      setSearchParams(param);
      dispatch(searchProduct(param));

      return { ...state, "category[regex]": category, page: 1 };
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <Container>
      <Content>
        {!isAdd ? (
          <>
            <Wrapper>
              <SearchField>
                <input
                  placeholder="Search Product"
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setSearchInfo((state) => ({
                      ...state,
                      "name[regex]": e.target.value,
                    }));
                    const param = { ...searchInfo };
                    Object.keys(param).forEach((key) => {
                      return (
                        (param[key] === undefined || param[key] == false) &&
                        delete param[key]
                      );
                    });
                    setSearchParams({
                      ...param,
                      "name[regex]": e.target.value,
                    });
                  }}
                  value={searchInfo["name[regex]"]}
                />
                <Button
                  onClick={() => {
                    const param = { ...searchInfo };
                    Object.keys(param).forEach((key) => {
                      return (
                        (param[key] === undefined || param[key] == false) &&
                        delete param[key]
                      );
                    });
                    dispatch(searchProduct(param));
                    setSearchInfo((state) => ({
                      ...state,
                      "name[regex]": "",
                    }));
                  }}
                >
                  <SearchIcon style={{ fontSize: 20, marginRight: 16 }} />
                </Button>
              </SearchField>
              <ProductCategory>
                <CategoryItem
                  data-category={""}
                  active={searchParams.get("category[regex]") === null}
                  onClick={(e) => {
                    handleFilter(e.target);
                  }}
                >
                  All
                </CategoryItem>
                {console.log(searchParams.get("category[regex]"))}
                {categories.length !== 0 &&
                  categories.map((item) => (
                    <CategoryItem
                      key={item._id}
                      data-category={item.name}
                      active={
                        searchParams.get("category[regex]") === item.name
                      }
                      onClick={(e) => {
                        handleFilter(e.target);
                      }}
                    >
                      {capitalizeFirstLetter(item.name)}
                    </CategoryItem>
                  ))}
              </ProductCategory>
              <ButtonAdd onClick={handleAddPage}>
                <AddIcon style={{ fontSize: 20 }}></AddIcon>
                <span>Add</span>
              </ButtonAdd>
            </Wrapper>
            <HeaderTitle>
              <h2>Product</h2>
            </HeaderTitle>

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
            <Stack
              spacing={4}
              sx={{ marginTop: "16px", marginBottom: "16px" }}
            >
              {/* <Pagination sx={{fontSize:'1.6rem'}} size="large" count={10}  /> */}
              <Pagination
                count={totalPage}
                page={searchInfo.page}
                onChange={handleChange}
                sx={{ display: "flex", justifyContent: "center" }}
                renderItem={(item) => (
                  <PaginationItem {...item} sx={{ fontSize: "1.6rem" }} />
                )}
              />
            </Stack>
          </>
        ) : (
          <AddProduct callback={setIsAdd} />
        )}
      </Content>
    </Container>
  );
}

export default Products;

const Container = styled.div`
  padding: 8px 36px;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 12px;
  width: 100%;
`;


const Wrapper = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCategory = styled.div`
  display: flex;
  padding: 12px;
`;

const CategoryItem = styled.div`
  margin-left: 8px;
  background-color: ${(props) => (props.active ? "red" : "#f9fafb")};
  padding: 8px 12px;
  font-size: 1.6rem;
  border-radius: 4px;
  cursor: pointer;

  :hover {
    background-color: yellow;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--text-color);
    margin-right: 12px;
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


const SearchField = styled.div`
  /* margin-top: 24px; */
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
