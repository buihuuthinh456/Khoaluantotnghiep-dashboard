import React, { useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import SinglePageProduct from '../components/SinglePageProduct';
import AddProduct from '../components/AddProduct';

function Products() {

  const [isAdd, setIsAdd] = useState(false)

  const handleAddPage = () => {
    setIsAdd(true)
  }

  return (
    <Container>
      {!isAdd 
      ? <ProductCategory>
          <HeaderTitle>
                <h2>Product</h2>

                <ButtonAdd onClick={handleAddPage}>
                  <AddIcon style={{fontSize: 20,}}></AddIcon>
                  <span>Add</span>
                </ButtonAdd>
            </HeaderTitle>

            <Content>
              <SearchField>
                <SearchIcon style={{fontSize: 20, marginRight: 16}}></SearchIcon>
                <input placeholder='Search Product'></input>
              </SearchField>

              <ContentMenu>
                <Link to='/SinglePageProduct' style={{textDecoration: 'none'}}>
                  <ContentItem>
                    <ItemImage>
                      <img src='images/product-image.jpg' alt='item-img'></img>
                      <ItemInfo>
                      <Icon>
                        <SearchIcon></SearchIcon>
                      </Icon>
                    </ItemInfo>
                    </ItemImage>
                    <ProductName>
                        <span>Nike Air Force 1 NDESTRUKT</span>
                    </ProductName>
                  </ContentItem>
                </Link>
              </ContentMenu>
            </Content>
        </ProductCategory>
      : <AddProduct />
      }

    </Container>
  )
}

export default Products

const Container = styled.div`
  padding: 20px 36px;
  z-index: -1;
`

const ProductCategory = styled.div`

`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--text-color);
  }
`

const ButtonAdd = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  padding: 8px 16px;
  background-color: var(--primary-color);
  border-radius: 50px;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px;
  
  span {
    font-size: 1.6rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-left: 8px;
  }

  &:hover {
    opacity: 0.85;
  }
`

const Content = styled.div`
  margin-top: 36px;
`

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
`

const ContentMenu = styled.ul`
  margin-top: 24px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(210px, 1fr));
  grid-gap: 36px;
`

const ItemInfo = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 500ms ease;
  cursor: pointer;
`

const ContentItem = styled.li`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ProductName = styled.div`
  margin-top: 16px;
  padding: 8px;

  span {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text-color);
  }
`

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
`



const Icon = styled.div`
  background-color:white;
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
`