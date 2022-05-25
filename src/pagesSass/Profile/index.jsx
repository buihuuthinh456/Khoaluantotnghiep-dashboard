import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Profile.module.scss";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

import Button from "@mui/material/Button";
// redux
import {useDispatch, useSelector} from "react-redux"
import {selectsProfile, getHistoryPayment} from "../../features/profile/profileSlice"


function Profile() {
  const dispatch = useDispatch()

  const data = useSelector(selectsProfile).data
  const isLoading = useSelector(selectsProfile).isLoading

  useEffect(()=>{
    dispatch(getHistoryPayment())
  }, [])

  if (isLoading)
    return (
      <Modal>
        <Loading />
      </Modal>
    );
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Profile</h2>

      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <img src="images/default-user-image.jpg" alt="1" />
        </div>

        <ul className={styles.profile}>
          <li className={styles.userProfile}>
            <TextField
              fullWidth
              id="outlined-name"
              label="User Name"
              variant="standard"
              value="Bui Huu Thinh"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </li>
          <li className={styles.userProfile}>
            <TextField
              fullWidth
              id="outlined-name"
              label="User Name"
              variant="standard"
              value="Bui Huu Thinh"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
            />
          </li>

          <div className={styles.options}>
            <div className={styles.btnOptions}>
              <Button variant="contained">Change PassWord</Button>
            </div>
          </div>
        </ul>
      </div>

      <div className={styles.history}>
        <h2 className={styles.title}>Lịch sử giao dịch</h2>
      </div>
    </div>
  );
}

export default Profile;
