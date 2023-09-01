import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment-timezone";

const HospitalList = () => {
  const [data, setData] = useState([]);

  const getHospitals = async () => {
    try {
      const response = await API.get("/admin/hospital-list");
      console.log("getDonars", response.data);
      if (response.data?.success === true) {
        setData(response.data?.hospitalData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  // delete function

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you Sure Want to Delete This Hospital",
        "Sure"
      );

      if (!answer) return;
      const response = await API.delete(`/admin/delete-donar/${id}`);

      alert(response.data?.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Eamil</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record?.hospitalName}</td>
              <td>{record?.email}</td>
              <td>{record?.phone}</td>
              <td>{moment(record?.createdAt).format("DD-MM-YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default HospitalList;
