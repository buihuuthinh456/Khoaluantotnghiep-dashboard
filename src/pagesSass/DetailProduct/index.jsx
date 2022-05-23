import React, { useEffect, useState } from "react";
import styles from "./DetailProduct.module.scss";

// MUI

// Components
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import MoreInfoForm from "../../components_SASS/MoreInfoForm";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  selectDetailProduct,
  fetchDetailProduct,
} from "../../features/detailProduct/detailProductSlice";
// Others
import { Link, useParams } from "react-router-dom";
import CurrencyFormat from "../../functionJS";
import { Button } from "@mui/material";
import AddForm from "../../components_SASS/AddForm";

function DetailProduct() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const [addMoreInfo, setAddMoreInfo] = useState(false);

  const detailProduct = useSelector(selectDetailProduct).data;
  const isLoading = useSelector(selectDetailProduct).isLoading;

  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Link to={"/products"}>Back</Link>
      </div>
      {detailProduct && (
        <div className={styles.productContent} key={detailProduct._id}>
          <div className={styles.imgWrapper}>
            <img
              src={detailProduct.images[0].url}
              key={detailProduct.images[0].public_id}
              alt="img"
            />
          </div>

          <div className={styles.productInfo}>
            <div className={styles.title}>{detailProduct.name}</div>

            <div className={styles.price}>
              {CurrencyFormat(detailProduct.price)}
            </div>

            <div className={styles.desc}>
              <h2>Description</h2>
              <span>{detailProduct.description}</span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.addMoreInfo}>
        <Button
          variant="contained"
          onClick={() => setAddMoreInfo((state) => !state)}
        >
          Add More Info
        </Button>
      </div>

      <div className={styles.moreInfo}>
        
      </div>
    </div>
  );
}

export default DetailProduct;
