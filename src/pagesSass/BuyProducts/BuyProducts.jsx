import React from "react";
import styles from "./buyProducts.module.scss";

function BuyProducts() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.title}>
          <h1>Giỏ hàng của bạn</h1>
        </div>

        <ul className={styles.productList}>
          <li className={styles.productTitle}>
            <div className={styles.name}>
              <span>Tên sản phẩm</span>
            </div>
            <div className={styles.money}>
              <span>Giá sản phẩm</span>
            </div>
            <div className={styles.quantity}>
              <span>Số Lượng</span>
            </div>
            <div className={styles.totalMoney}>
              <span>Tổng tiền</span>
            </div>
          </li>

          <li className={styles.productItem}>
            <div className={styles.productName}>
              <div className={styles.imgWrapper}>
                <img src="/images/IC-image.jpg" alt="132" />
              </div>
              <span>Product name</span>
            </div>
            <div className={styles.productMoney}>
              <span>100000đ</span>
            </div>
            <div className={styles.productQuantity}>
              <span>5</span>
            </div>
            <div className={styles.productTotalMoney}>
              <span>5000000</span>
            </div>
          </li>

          <li className={styles.productItem}>
            <div className={styles.productName}>
              <div className={styles.imgWrapper}>
                <img src="/images/IC-image.jpg" alt="132" />
              </div>
              <span>Product name</span>
            </div>
            <div className={styles.productMoney}>
              <span>100000đ</span>
            </div>
            <div className={styles.productQuantity}>
              <span>5</span>
            </div>
            <div className={styles.productTotalMoney}>
              <span>5000000</span>
            </div>
          </li>

          <li className={styles.productItem}>
            <div className={styles.productName}>
              <div className={styles.imgWrapper}>
                <img src="/images/IC-image.jpg" alt="132" />
              </div>
              <span>Product name</span>
            </div>
            <div className={styles.productMoney}>
              <span>100000đ</span>
            </div>
            <div className={styles.productQuantity}>
              <span>5</span>
            </div>
            <div className={styles.productTotalMoney}>
              <span>5000000</span>
            </div>
          </li>

          <li className={styles.productItem}>
            <div className={styles.productName}>
              <div className={styles.imgWrapper}>
                <img src="/images/IC-image.jpg" alt="132" />
              </div>
              <span>Product name</span>
            </div>
            <div className={styles.productMoney}>
              <span>100000đ</span>
            </div>
            <div className={styles.productQuantity}>
              <span>5</span>
            </div>
            <div className={styles.productTotalMoney}>
              <span>5000000</span>
            </div>
          </li>

          <li className={styles.productItem}>
            <div className={styles.productName}>
              <div className={styles.imgWrapper}>
                <img src="/images/IC-image.jpg" alt="132" />
              </div>
              <span>Product name</span>
            </div>
            <div className={styles.productMoney}>
              <span>100000đ</span>
            </div>
            <div className={styles.productQuantity}>
              <span>5</span>
            </div>
            <div className={styles.productTotalMoney}>
              <span>5000000</span>
            </div>
          </li> 
        </ul>
      </div>
    </div>
  );
}

export default BuyProducts;
