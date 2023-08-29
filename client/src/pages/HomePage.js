import React, { useState, useEffect } from "react";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import { useSelector } from "react-redux";
import API from "../services/API";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const getBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-inventory");
      if (response.data?.success) {
        setData(response.data?.inventory);
        console.log("getBloodRecordsResponse", response.data.inventory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout user={user}>
      {user?.user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i>
              Add Inventory
            </h4>

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
                {data?.map((record) => (
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
            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
