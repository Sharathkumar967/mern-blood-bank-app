export const handleLogin = (e, email, password, role) => {
  try {
    if (!role || !email || !password) {
      return alert("Please Provide All fields");
    }
    console.log("login >>>>>>>>>>>>>", e, email, password, role);
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
  console.log(
    "Register >>>>>>>>>>>>>>>>>>>>.",
    name,
    role,
    email,
    password,
    hospitalName,
    website,
    address,
    organizationName,
    phone
  );
};
