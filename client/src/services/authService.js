import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All fields");
    }
    console.log("email", email, "password", password, "role", role);
    store.dispatch(userLogin({ email, password, role }));
  } catch (err) {
    console.log(err);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  hospitalName,
  website,
  address,
  organizationName,
  phone
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        hospitalName,
        website,
        address,
        organizationName,
        phone,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
