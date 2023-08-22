import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment-timezone";

const Hospitals = () => {
  const [data, setData] = useState([]);

  const getHospitals = async () => {
    try {
      const response = await API.get("/inventory/get-hospitals");
      console.log("getHospitals", response.data);
      if (response.data?.success === true) {
        setData(response.data?.hospitals);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <Layout>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Eamil</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>

            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record?.hospitalName}</td>
              <td>{record?.email}</td>
              <td>{record?.phone}</td>
              <td>{record?.address}</td>
              <td>{moment(record?.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Hospitals;
