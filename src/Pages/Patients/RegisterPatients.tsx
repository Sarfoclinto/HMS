import { RightOutlined } from "@ant-design/icons";
import {
  Flex,
  Breadcrumb,
  Card,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  message,
} from "antd";
import { NavLink, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { useState } from "react";
import { v4 as uuid } from "uuid";
const items = [
  {
    title: <NavLink to="/dashboard">Dashboard</NavLink>,
  },
  {
    title: <span>Patients</span>,
  },
  {
    title: (
      <NavLink to="/dashboard/patients/registerPatients">
        Register Patients
      </NavLink>
    ),
  },
];
const RegisterPatients = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const { setAdd }: { setAdd: React.Dispatch<React.SetStateAction<number>> } =
    useOutletContext();

  const onFinish = (values: PatientType) => {
    const newPatient = {
      ...values,
      patientId: `P${uuid().split("-")[2]}`,
      medication: "",
    };
    setLoading(true);
    setTimeout(() => {
      fetch("http://localhost:8001/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      })
        .then((res) => {
          if (!res.ok) {
            message.error("Error setting patient");
            setLoading(false);
            form.resetFields();
            throw new Error("Error setting patient");
          }
          return res.json();
        })
        .then(() => {
          setTimeout(() => {
            message.success("Patient set successfully!!!", 2);
            setAdd((prev: number) => prev + 1);
            setLoading(false);
            form.resetFields();
          }, 1500);
        })
        .catch((err) => {
          setLoading(false);
          message.info(err.message);
        });
    }, 1000);
  };
  // const onFinishFailed = (values) => {
  //   console.log(values);
  // };
  return (
    <>
      <main>
        <section id="header">
          <Flex align="center" justify="space-between" className="mb-5">
            <div className="heading text-xl font-medium">Register Patient</div>

            <Breadcrumb separator={<RightOutlined />} items={items} />
          </Flex>
        </section>
        <section>
          <Card>
            <h1 className="text-lg">Fill all fields</h1>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Flex align="center" gap={15}>
                <Form.Item<PatientType>
                  label="First Name"
                  name="firstName"
                  key="firstname"
                  className="w-1/2"
                  hasFeedback
                  rules={[{ required: true, message: "Firstname is required" }]}
                >
                  <Input
                    placeholder="Patient Firstname"
                    allowClear
                    variant="filled"
                  />
                </Form.Item>
                <Form.Item<PatientType>
                  label="Last Name"
                  name="lastName"
                  key="lastname"
                  hasFeedback
                  className="w-1/2"
                  rules={[{ required: true, message: "Lastname is required" }]}
                >
                  <Input
                    placeholder="Patient Lastname"
                    allowClear
                    variant="filled"
                  />
                </Form.Item>
              </Flex>
              <Flex align="center" gap={15}>
                <Form.Item<PatientType>
                  label="Date Of Birth"
                  name="dob"
                  key="dateOfBirth"
                  className="w-1/2"
                  hasFeedback
                  rules={[
                    { required: true, message: "Date of birth is required" },
                    { type: "date", message: "Invalid input type" },
                  ]}
                >
                  <DatePicker className="w-full" variant="filled" />
                </Form.Item>
                <Form.Item<PatientType>
                  label="Age"
                  name="age"
                  key="age"
                  hasFeedback
                  className="w-1/2"
                  rules={[{ required: true, message: "Age is required" }]}
                >
                  <Input
                    placeholder="Patient Age"
                    allowClear
                    variant="filled"
                  />
                </Form.Item>
              </Flex>
              <Flex align="center" gap={15}>
                <Form.Item<PatientType>
                  label="Address"
                  name="address"
                  key="address"
                  hasFeedback
                  className="w-1/2"
                  rules={[{ required: true, message: "Address is required" }]}
                >
                  <Input
                    allowClear
                    placeholder="Patient Address"
                    variant="filled"
                  />
                </Form.Item>

                <Form.Item<PatientType>
                  label="Gender"
                  name="gender"
                  key="gender"
                  hasFeedback
                  className="w-1/2"
                  rules={[{ required: true, message: "Gender is required" }]}
                >
                  <Select
                    defaultValue={[""]}
                    variant="filled"
                    options={[
                      { label: "Select Gender", value: "" },
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                      { label: "Other", value: "Other" },
                    ]}
                  />
                </Form.Item>
              </Flex>
              <Flex align="center" gap={10} className="w-full">
                <Form.Item<PatientType>
                  label="Mobile Number"
                  name="mobileContact"
                  key="mobileNumber"
                  hasFeedback
                  className="w-1/3"
                  rules={[
                    { required: true, message: "Mobile number is required" },
                  ]}
                >
                  <Input
                    placeholder="Patient Mobile Number"
                    allowClear
                    variant="filled"
                  />
                </Form.Item>

                <Form.Item<PatientType>
                  label="Ailment"
                  name="diagnosis"
                  key="ailment"
                  hasFeedback
                  className="w-1/3"
                  rules={[{ required: true, message: "Field is required" }]}
                >
                  <Input
                    allowClear
                    placeholder="Patient Ailment"
                    variant="filled"
                  />
                </Form.Item>

                <Form.Item<PatientType>
                  label="Patient Type"
                  name="category"
                  key="category"
                  hasFeedback
                  className="w-1/3"
                  rules={[{ required: true, message: "Field is required" }]}
                >
                  <Select
                    defaultValue={[""]}
                    variant="filled"
                    options={[
                      { label: "Select Patient Type", value: "" },
                      { label: "In Patient", value: "Inpatient" },
                      { label: "Out Patient", value: "Outpatient" },
                      { label: "Choose", value: "Choose" },
                    ]}
                  />
                </Form.Item>
              </Flex>
              <Form.Item<PatientType>>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  className="mt-3"
                  loading={loading}
                  disabled={loading}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </section>
      </main>
    </>
  );
};

export default RegisterPatients;
