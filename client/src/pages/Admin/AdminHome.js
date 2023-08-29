import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.user?.name}</i>
          </h1>
          <h3>Magage Blood Bank App</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            malesuada, nisi ut lacinia efficitur, odio mi convallis nisl, nec
            varius urna orci at augue. Nullam ultrices tincidunt orci, sed
            tristique odio auctor vel. Sed vel ipsum id nisl accumsan suscipit.
            Fusce sed libero bibendum, varius libero at, varius neque. Maecenas
            venenatis bibendum nisl, a finibus odio ullamcorper eu. Praesent
            eget velit nec nunc sollicitudin rhoncus. In dapibus, tortor et
            consequat eleifend, justo nunc venenatis orci, et blandit dui eros
            vel nisi. Null
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
