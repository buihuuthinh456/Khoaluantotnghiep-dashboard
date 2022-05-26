import React, { Fragment, useEffect, useState } from "react";
import styles from "./DetailProduct.module.scss";

// MUI

// Components
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
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
import MoreInfoProduct from "../../components_SASS/MoreInfoForm";

function DetailProduct() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const [addMoreInfo, setAddMoreInfo] = useState(false);
  const detailProduct = useSelector(selectDetailProduct).data;
  const moreInfo = useSelector(selectDetailProduct).moreInfo;
  const isLoading = useSelector(selectDetailProduct).isLoading;
  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  if (isLoading)
    return (
      <Fragment>
        <Modal>
          <Loading />
        </Modal>
      </Fragment>
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

      {moreInfo.length !== 0 && (
        <>
          <div className={styles.moreInfoContent}>
            <h2>More Info</h2>

            {moreInfo.map((item, index) => (
              <div className={styles.moreInfoBody} key={index}>
                <h2 className={styles.title}>{item.title}</h2>
                {item.table && <div className={styles.table}>table</div>}
                <div className={styles.imgWrapper}>
                  <img src={item.url_img[0].url} alt="Product" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.addMoreInfo}>
        <Button
          variant="contained"
          onClick={() => setAddMoreInfo((state) => !state)}
        >
          Add More Info
        </Button>
      </div>

      {addMoreInfo && (
        <div className={styles.moreInfo}>
          <MoreInfoProduct id={productID} />
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
