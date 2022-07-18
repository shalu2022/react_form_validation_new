import { useEffect, useState } from "react";
import "./components/style.css";
import InputField from "./components/inputField";

const App = () => {
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const inputProps = [
    {
      id: "1",
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      icon: "account_circle"
    },
    {
      id: "2",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      icon: "email"
    },
    {
      id: "3",
      name: "mobile",
      type: "number",
      placeholder: "Mobile",
      label: "Mobile",
      icon: "phone"
    },
    {
      id: "4",
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: "perm_identity"
    },
    {
      id: "5",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      // error_message: "Should be same as Password",
      label: "Confirm Password",
      icon: "person_add"
    }
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(validate(user));
    setIsSubmit(true);
  };

  const validate = (value) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!value.username) {
      errors.username = "Username Required";
    } else if (value.username.length < 4 || value.username.length > 10) {
      errors.username = "Username must be between 3-10 characters";
    }
    if (!value.email) {
      errors.email = "Email Required";
    } else if (!regex.test(value.email)) {
      errors.email = "Email is incorrect";
    }
    if (!value.mobile) {
      errors.mobile = "Mobile Number is Required";
    } else if (value.mobile.length < 10 || value.mobile.length > 10) {
      errors.mobile = "Mobile Number must contain 10 digits";
    }
    if (!value.password) {
      errors.password = "Password Required";
    } else if (!regexPass.test(value.password)) {
      errors.password =
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    }
    if (!value.confirmPassword) {
      errors.confirmPassword = "Confirm the Password";
    } else if (value.confirmPassword !== value.password) {
      errors.confirmPassword = "Password should match properly";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(errors);
    }
  }, [errors]);

  return (
    <div className="app row ">
      <h4 className="center">Register Form</h4>
      <div className="col">
        <form
          className="form #fff3e0 orange lighten-5 z-depth-2"
          onSubmit={submitHandler}
        >
          {inputProps.map((input) => (
            <InputField
              key={input.id}
              {...input}
              value={user[input.name]}
              onChange={onChange}
              errors={errors}
            />
          ))}

          <div className="center">
            <button className="waves-effect waves-light btn  hoverable">
              Submit
            </button>
          </div>
          <h4>
            {Object.keys(errors).length === 0 && isSubmit ? (
              <div className="green-text center">Registered Successfully</div>
            ) : (
              ""
            )}
          </h4>
        </form>
      </div>
    </div>
  );
};

export default App;
