import React from 'react'
import styles from './BeforeAction.module.scss'

import Button from "@mui/material/Button";


function BeforeAction({ title, onCancel, onConfirm}) {
  return (
    <div className={styles.container}>
        <div className={styles.body}>
            <div className={styles.title}>
                <h3>{title}</h3>
            </div>

            <div className={styles.action}>
                <div className={styles.btn}>
                    <Button variant="text" onClick={onCancel}>
                        Hủy
                    </Button>

                    <Button variant="text" onClick={onConfirm}>
                        Xác nhận
                    </Button>
                </div>    
            </div>        
        </div>
    </div>
  )
}

export default BeforeAction