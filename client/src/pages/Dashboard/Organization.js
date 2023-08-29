import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import API from "../../services/API";
import moment from "moment-timezone";

const Organization = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("organization", user?.user);
  const [data, setData] = useState([]);

  const getOrganization = async () => {
    try {
      if (user?.user?.role === "donar") {
        const response = await API.get("/inventory/get-organization");
        console.log("getOrganization", response.data);
        if (response.data?.success === true) {
          setData(response.data?.organizations);
        }
      }

      if (user?.user?.role === "hospital") {
        const response = await API.get(
          "/inventory/get-organization-for-hospital"
        );
        console.log("getOrganization2", response.data);
        if (response.data?.success === true) {
          setData(response.data?.organizations);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrganization();
  }, [user?.user]);

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

export default Organization;
