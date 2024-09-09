import { RightOutlined } from "@ant-design/icons";
import { Flex, Breadcrumb, Card, Form, Input, DatePicker, Select } from "antd";
import { NavLink } from "react-router-dom";
import { PatientType } from "../../Modules/types";
const items = [
  {
    title: "Dashboard",
  },
  {
    title: <span>Patients</span>,
  },
  {
    title: (
      <NavLink to="/dashboard/patients/registerPatients">View Patients</NavLink>
    ),
  },
];
const RegisterPatients = () => {
  const [form] = Form.useForm();
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
            <Form layout="vertical" form={form}>
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
                  rules={[{ required: true, message: "Firstname is required" }]}
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
                  <DatePicker className="w-full" />
                </Form.Item>
                <Form.Item<PatientType>
                  label="Age"
                  name="age"
                  key="age"
                  hasFeedback
                  className="w-1/2"
                  rules={[
                    { required: true, message: "Age is required" },
                    {
                      type: "number",
                      message: "Invalid Input type",
                    },
                  ]}
                >
                  <Input
                    placeholder="Patient Age"
                    allowClear
                    variant="filled"
                  />
                </Form.Item>
              </Flex>
              <Form.Item<PatientType>
                label="Address"
                name="address"
                key="address"
                hasFeedback
                className=""
                rules={[{ required: true, message: "Age is required" }]}
              >
                <Input
                  allowClear
                  placeholder="Patient Address"
                  variant="filled"
                />
              </Form.Item>
              <Flex align="center" gap={10} className="w-full">
                <Form.Item<PatientType>
                  label="Mobile Number"
                  name="mobileContact"
                  key="mobileNumber"
                  hasFeedback
                  className="w-1/3"
                  rules={[{ required: true, message: "Age is required" }]}
                >
                  <Input
                    placeholder="Patient Number"
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
                    options={[
                      { label: "Select Patient Type", value: "" },
                      { label: "In Patient", value: "Inpatient" },
                      { label: "Out Patient", value: "Outpatient" },
                      { label: "Choose", value: "Choose" },
                    ]}
                  />
                </Form.Item>
              </Flex>
            </Form>
          </Card>
        </section>
      </main>
    </>
  );
};

export default RegisterPatients;
