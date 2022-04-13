import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import Modal from "../components/Modal";
import Loading from "../components/Loading";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectDetailProduct,
  fetchDetailProduct,
} from "../features/detailProduct/detailProductSlice";

function DetailProduct() {
  const { productID } = useParams();

  const [amount, setAmount] = useState(1);

  const data = useSelector(selectDetailProduct).data;
  const isLoading = useSelector(selectDetailProduct).isLoading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
  }, [productID]);

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );

  const detailProduct = data;

  return (
    <Container>
      {detailProduct && (
        <Wrapper>
          <ImgWrapper>
            <img src={detailProduct.images[0].url} alt="product-img"></img>
          </ImgWrapper>

          <ProductInfo>
            <Title>{detailProduct.name}</Title>
            <Price>
              <span>{`$${detailProduct.price}`}</span>
            </Price>
            <Desc>
              <h2>Desciption</h2>
              <span>{detailProduct.description}</span>
            </Desc>
            <ProductController>
              <Quantity>
                <Remove onClick={() => setAmount((state) => state - 1)}>
                  <RemoveIcon style={{ fontSize: 20 }}></RemoveIcon>
                </Remove>
                <Amount>{amount}</Amount>
                <Add onClick={() => setAmount((state) => state + 1)}>
                  <AddIcon style={{ fontSize: 20 }} />
                </Add>
              </Quantity>

              <ButtonAdd>Add to cart</ButtonAdd>
            </ProductController>
          </ProductInfo>
        </Wrapper>
      )}
    </Container>
  );
}

export default DetailProduct;

const Container = styled.div`
  padding: 0 36px;
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 0;
`;

const ImgWrapper = styled.div`
  flex: 1;
  height: 60vh;
  margin-right: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--text-color);
`;

const Desc = styled.div`
  margin: 16px 0;
  h2 {
    font-size: 2.4rem;
    color: var(--text-color);
  }

  span {
    font-size: 1.6rem;
    font-weight: 300;
    color: var(--text-color);
    letter-spacing: 1.1;
    text-align: center;
  }
`;

const Price = styled.div`
  h2 {
    font-size: 2.4rem;
    color: var(--text-color);
  }

  span {
    font-size: 2.7rem;
    color: var(--primary-color);
  }
`;

const ProductController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
`;

const Remove = styled.button`
  border: none;
  padding: 8px;
  border-radius: 2px;
  margin-right: 8px;
  cursor: pointer;
`;

const Amount = styled.div`
  font-size: 2rem;
  margin: 0 8px;
`;

const Add = styled(Remove)`
  margin-right: 0;
  margin-left: 8px;
`;

const ButtonAdd = styled.button`
  border: 2px solid teal;
  padding: 15px;
  background-color: white;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--text-color);

  &:hover {
    opacity: 0.8;
  }
`;
