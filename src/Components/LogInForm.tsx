import { Form, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { UserInputTypes } from "../Modules/types";
import { replace, useNavigate } from "react-router-dom";

const LogInForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userInputs, setUserInputs] = useState<UserInputTypes>({
    emailAddress: "",
    password: "",
  });
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:8000/users")
      .then((res) => {
        if (!res.ok) {
          message.info("Sorry, there was an error");
          throw new Error("Sorry, there was an error");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.info(error);
        throw new Error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onFinish = (values) => {
    const user = users?.find((user) => {
      return user.email === values.emailAddress;
    });

    if (user) {
      if (
        user.email === values.emailAddress &&
        user.password === values.password
      ) {
        setLoading(true);
        setTimeout(() => {
          message.success("Login successfully", 2);
          setLoading(false);
          setTimeout(() => {
            form.resetFields();
            // navigate to dashboard
            // message.success("Dashboard");
            navigate("/dashboard", { replace: true });
          }, 300);
        }, 1000);
      } else {
        message.info("Login errro. Email or Password Incorrect", 3);
        setTimeout(() => {
          form.resetFields();
        }, 1000);
      }
    } else {
      message.error(`Sorry, User ${userInputs.emailAddress} not found`);
    }
  };

  return (
    <>
      <Form
        className="mt-10"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <h4 className="text-center text-stone-400 font-medium">
          Enter your email address and password to <br /> access Doctor panel
        </h4>
        <Form.Item
          label="Email Address"
          name="emailAddress"
          rules={[
            { type: "email", message: "Please enter a valid email" },
            { required: true, message: "Field is required" },
          ]}
          wrapperCol={{ span: 30 }}
          labelCol={{ span: 7 }}
          hasFeedback
        >
          <Input
            name="emailAddress"
            placeholder="Enter your doctor number"
            allowClear
            value={userInputs.emailAddress}
            onChange={handleUserInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          wrapperCol={{ span: 30 }}
          labelCol={{ span: 7 }}
          rules={[
            {
              min: 8,
              message: "Password cannot be less than 8 characters",
            },
            { required: true, message: "Password is required" },
          ]}
          hasFeedback
        >
          <Input.Password
            name="password"
            placeholder="Enter password"
            allowClear
            value={userInputs.password}
            onChange={handleUserInputChange}
          />
        </Form.Item>
        <Form.Item className="mt-10">
          <Button
            type="primary"
            block
            htmlType="submit"
            loading={loading}
            disabled={loading ? true : false}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogInForm;
