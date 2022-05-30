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
  deleteMoreInfoProductAsync,
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
  const isReload = useSelector(selectDetailProduct).isReload;
  const moreInfo = useSelector(selectDetailProduct).moreInfo;
  const isLoading = useSelector(selectDetailProduct).isLoading;

  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    dispatch(fetchDetailProduct(productID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productID]);

  useEffect(() => {
    if (isReload) {
      dispatch(fetchDetailProduct(productID));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReload]);

  const handleDelete = (data, productID) => {
    if (localStorage.getItem("accessToken")) {
      const dataSend = {
        productID,
        data,
      };
      dispatch(deleteMoreInfoProductAsync(dataSend));
    } else {
      console.log("please Login");
    }
  };

  const fakeTable = `Điện áp làm việc: DC/AC 12-24V tải điện: 10A Encoding: Học_Khả năng thực thiện: tự khóa, kết nối hoặc chạy jog: đầu ra hoạt động (đầu ra 220 volt)_Tần số nhận: 433MHZ_Khoảng cách từ xa: 50 mét`;

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

      {moreInfo === null || moreInfo.length === 0 ? (
        ""
      ) : (
        <>
          <div className={styles.moreInfoContent}>
            <h4>Thông tin thêm về sản phẩm</h4>

            {moreInfo.map((item, index) => (
              <div className={styles.moreInfoBody} key={index}>
                <div className={styles.moreInfoHeader}>
                  <h5>Mô tả</h5>
                  <p>{item.moreDesc}</p>
                </div>
                {item.table && (
                  <ul>
                    <h5>Thông số kỹ thuật</h5>
                    {item.table &&
                      item.table
                        .split("_")
                        .map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                )}

                <div className={styles.imgWrapper}>
                  <img src={item.url_img[0].url} alt="Product" />
                </div>

                <div className={styles.button}>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ marginRight: 15 }}
                    onClick={() => {
                      setAddMoreInfo((state) => !state);
                      setIsEdit(true);
                      setData(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item, productID)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.addMoreInfo}>
        {moreInfo === null || moreInfo.length === 0 ? (
          <Button
            variant="contained"
            onClick={() => setAddMoreInfo((state) => !state)}
          >
            Add More Info
          </Button>
        ) : (
          ""
        )}
      </div>

      {addMoreInfo && (
        <div className={styles.moreInfo}>
          <MoreInfoProduct
            id={productID}
            isEdit={isEdit}
            dataSend={data}
            afterSubmit={() => {
              setData(null);
              setIsEdit(false);
              setAddMoreInfo(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
