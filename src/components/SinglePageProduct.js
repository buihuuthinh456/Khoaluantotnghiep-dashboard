import React, { useState } from 'react'
import styled from 'styled-components'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function SinglePageProduct() {

    const [amount, setAmount] = useState(1)
  return (
    <Container>
        <ImgWrapper>
            <img src='images/product-image.jpg' alt='product-img'></img>
        </ImgWrapper>

        <ProductInfo>
            <Title>Nike Air Force 1 NDESTRUKT</Title>
            <Price>
                <span>$65</span>
            </Price>
            <Desc>
                <h2>Desciption</h2>
                <span>
                    "Sed ut perspiciatis unde omnis iste natus error sit 
                    voluptatem accusantium doloremque laudantium, totam 
                    rem aperiam, eaque ipsa quae ab illo inventore veritatis 
                    et quasi architecto beatae vitae dicta sunt explicabo. 
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
                    odit aut fugit, sed quia consequuntur magni dolores eos qui 
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui 
                    dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed 
                    quia non numquam eius modi tempora incidunt ut labore et dolore 
                    magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis 
                    nostrum exercitationem ullam corporis suscipit laboriosam, 
                    nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum 
                    iure reprehenderit qui in ea voluptate velit esse quam nihil 
                    molestiae consequatur, vel illum qui dolorem eum fugiat quo 
                    voluptas nulla pariatur?"
                </span>
            </Desc>
            <ProductController>
                <Quantity>
                    <Remove onClick={()=>setAmount(state=>state-1)}>
                        <RemoveIcon style={{fontSize: 20}}></RemoveIcon>
                    </Remove>
                    <Amount>
                        {amount}
                    </Amount>
                    <Add onClick={()=>setAmount(state=>state+1)}>
                        <AddIcon style={{fontSize: 20}}/>
                    </Add>
                </Quantity>

                <ButtonAdd>
                    Add to cart
                </ButtonAdd>
            </ProductController>
        </ProductInfo>
    </Container>
  )
}

export default SinglePageProduct

const Container = styled.div`
    padding: 0 36px;
    display: flex;
`

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
`

const ProductInfo = styled.div`
    flex: 1;
`

const Title = styled.h1`
    font-size: 3rem;
    color: var(--text-color);
`

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
`

const Price = styled.div`
    h2 {
        font-size: 2.4rem;
        color: var(--text-color); 
    }

    span {
        font-size: 2.7rem;
        color: var(--primary-color);
    }
`

const ProductController = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Quantity = styled.div`
    display: flex;
    align-items:center;
`

const Remove = styled.button`
    border: none;
    padding: 8px;
    border-radius: 2px;
    margin-right: 8px;
    cursor: pointer;
`

const Amount = styled.div`
    font-size: 2rem;
    margin: 0 8px;
`

const Add = styled(Remove)`
    margin-right: 0;
    margin-left: 8px;
`

const ButtonAdd = styled.button`
    border: 2px solid teal;
    padding: 15px;
    background-color: white;
    cursor: pointer;
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text-color);
    
    &:hover{
        opacity: 0.8;
    }
`