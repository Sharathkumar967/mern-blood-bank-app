import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment-timezone";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#c38154",
    "#ffc26f",
    "#4f709c",
    "#4942e4",
    "#0079ff",
    "#ff0060",
    "#22a699",
  ];
  // get blood gropu data

  const getBloodGroupData = async () => {
    try {
      const response = await API.get("analytics/bloodGroups-data");

      if (response?.data?.success) {
        setData(response.data?.bloodGroupData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRecentBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-recent-inventory");

      if (response.data?.success) {
        setInventoryData(response.data?.inventory);
        console.log("getRecentBloodRecords", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getRecentBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex flex-row flex-wrap">
          {data?.map((record, idx) => (
            <div
              className="card m-2 p-1"
              key={idx}
              style={{ width: "18rem", background: `${colors[idx]}` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">
                  {record.bloodGroup}
                </h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b>(ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>

              <div className="card-footer text-light bg-dark text-center">
                Total Available : <b>{record.availableBlood}</b> (ML)
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Time & Date (IST)</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record?.bloodGroup}</td>
                <td>{record?.inventoryType}</td>
                <td>{record?.quantity} (ML)</td>
                <td>{record?.email}</td>
                <td>
                  {moment(record?.createdAt)
                    .tz("Asia/Kolkata")
                    .format("DD-MM-YYYY HH:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
