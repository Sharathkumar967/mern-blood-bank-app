import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment-timezone";
import API from "../../services/API";
import { UseSelector, useSelector } from "react-redux";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getDonars = async () => {
    try {
      const response = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?.user?._id,
        },
      });
      console.log("getDonars", response.data);
      if (response.data?.success === true) {
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);
  return (
    <Layout>
      <div className="container mt-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record?.bloodGroup}</td>
                <td>{record?.inventoryType}</td>
                <td>{record?.quantity}</td>
                <td>{record?.email}</td>
                <td>
                  {moment(record?.createdAt).format("DD-MM-YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Consumer;
