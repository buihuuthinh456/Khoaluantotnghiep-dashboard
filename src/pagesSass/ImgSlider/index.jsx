import React, { useEffect, useState } from "react";
import styles from "./ImgSlider.module.scss";
import Button from "@mui/material/Button";
import SliderImageForm from "../../components_SASS/SliderImageForm";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";

import {
  createSliderImageAsync,
  deleteImgSliderAsync,
  fetchImgSlider,
  selectImgSlider,
} from "../../features/imgSlider/imgSliderSlice";
function ImgSlider() {
  const dispatch = useDispatch();
  const imgSliderData = useSelector(selectImgSlider).data;
  const isLoading = useSelector(selectImgSlider).isLoading;
  const isReload = useSelector(selectImgSlider).isReload;
  const [mountForm, setMountForm] = useState();

  useEffect(() => {
    dispatch(fetchImgSlider());
  }, []);

  useEffect(() => {
    if (isReload) dispatch(fetchImgSlider());
  }, [isReload]);

  const handleDelete = (id) => {
    const dataSend = {
      topicImgId: id,
    };
    dispatch(deleteImgSliderAsync(dataSend));
  };

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Slider Image</h1>
        </div>

        <div className={styles.addBtn}>
          {!mountForm ? (
            <Button variant="contained" onClick={() => setMountForm(true)}>
              Add
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setMountForm(false)}>
              Back
            </Button>
          )}
        </div>
      </div>
      {!mountForm && (
        <ul className={styles.imgContent}>
          {imgSliderData &&
            imgSliderData.map((item) => (
              <li className={styles.imgItem} key={item._id}>
                <div className={styles.imgWrapper}>
                  <img src={item.img.url} alt="123123" />
                </div>

                <div className={styles.btnOptions}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      )}

      {mountForm && <SliderImageForm></SliderImageForm>}
    </div>
  );
}

export default ImgSlider;
