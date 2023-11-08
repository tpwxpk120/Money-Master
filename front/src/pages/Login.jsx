import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";

const Login = () => {
  const img = "https://live.staticflickr.com/1144/5159991687_8f4a9771c1_b.jpg";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Simulated login logic (Replace this with actual login logic)
  const submitHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:7000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getFieldsValue()),
      });
      if (response.status === 201) {
        message.success("Login success");
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.body._id)); // Store user data
        navigate("/");

        console.log(data);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  // Prevent logged-in users from accessing the login page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-page">
      {loading && <Spinner />}
      <div className="row container">
        <h1>Money Master</h1>
        <div className="col-md-6">
          <img src={img} alt="login-img" width={"100%"} height="100%" />
        </div>
        <div className="col-md-4 login-form">
          <Form layout="vertical" form={form} onFinish={submitHandler}>
            <h1>Login Form</h1>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/register">Not a user? Click Here to register!</Link>
              <button className="btn">Login</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
