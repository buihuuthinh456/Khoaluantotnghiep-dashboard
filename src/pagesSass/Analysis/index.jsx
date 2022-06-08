import React, { useEffect, useState } from "react";
import styles from "./Analysis.module.scss";
import axios from "axios";
import { getDataAnalysis } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getDataAnalysisThunk,
  selectAnalysis,
} from "../../features/analysis/analysisSlice";

// Components
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

// MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
function Analysis() {
  const [searchParam, setSearchParam] = useSearchParams();
  const dispatch = useDispatch();
  const dataAnalysis = useSelector(selectAnalysis).data;
  const isLoading = useSelector(selectAnalysis).isLoading;

  //   useEffect(() => {
  //     dispatch(getDataAnalysisThunk());
  //   }, []);

  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    setDataChart(dataAnalysis);
  }, [dataAnalysis]);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSubmit = {
      dateStart,
      dateEnd,
    };
    setSearchParam(dataSubmit);
    const query = `dateStart=${dateStart}&dateEnd=${dateEnd}`;
    dispatch(getDataAnalysisThunk(query));
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
        <h1 className={styles.title}>Thống kê</h1>

        <form onSubmit={handleSubmit} className={styles.dateChoose}>
          <div className={styles.field}>
            <label htmlFor="dateStart">Từ ngày</label>
            <div className={styles.input}>
              <input
                value={dateStart}
                id="dateStart"
                name="dateStart"
                type="date"
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="dateEnd">Đến ngày</label>
            <div className={styles.input}>
              <input
                value={dateEnd}
                type="date"
                id="dateEnd"
                name="dateEnd"
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
            {console.log("data Start" + dateStart + " " + "dateEnd" + dateEnd)}
          </div>

          <div className={styles.button}>
            <Button variant="contained" type="submit" color="success">
              Tra cứu
            </Button>
          </div>
        </form>
      </div>

      <div className={styles.body}>
        <div className={styles.barChart}>
          {dataChart && dataChart.length !== 0 && (
            <>
              <Bar
                data={{
                  labels:
                    dataChart &&
                    dataChart?.accessData.map((item) => [item?.time]),
                  datasets: [
                    {
                      label: "Số lượt truy cập",
                      backgroundColor: ["#3e95cd"],
                      data:
                        dataChart &&
                        dataChart?.accessData.map((item) => [item?.count]),
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Số lượt truy cập",
                    },
                  },
                }}
              />

              <Bar
                data={{
                  labels:
                    dataChart &&
                    dataChart?.paymentData.map((item) => [item?.createdAt]),
                  datasets: [
                    {
                      label: "Tổng giá tiền",
                      yAxisID: "amount",
                      backgroundColor: ["#3e95cd"],
                      data:
                        dataChart &&
                        dataChart?.paymentData.map((item) => [item?.amount]),
                    },
                    {
                      label: "Số đơn hàng",
                      yAxisID: "countOrder",
                      backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                      data:
                        dataChart &&
                        dataChart?.paymentData.map((item) => [
                          item?.countOrder,
                        ]),
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Thanh toán",
                    },
                  },
                  scales: {
                    // yAxes: [{
                    //   id: 'amount',
                    //   position: 'left',
                    // }, {
                    //   display: false,
                    //   id: 'countOrder',
                    //   position: 'right',
                    //   ticks: {
                    //     max: 1,
                    //     min: 0
                    //   }
                    // }]

                    amount: {
                      type: "linear",
                      position: "left",
                    },
                    countOrder: {
                      type: "linear",
                      position: "right",
                      ticks: {
                        max: 1,
                        min: 0,
                      },
                    },
                  },
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
