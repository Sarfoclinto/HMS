import { RightOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { FieldType } from "../Modules/types";
const PersonalInfoForm = () => {
  return (
    <>
      <Form.Item<FieldType>
        label="Full name"
        name="fullname"
        rules={[
          { type: "string", message: "Invalid entry" },
          { required: true, message: "Field is required" },
        ]}
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
      >
        <Input name="fullname" placeholder="Enter your fullname" allowClear />
      </Form.Item>
      <Form.Item<FieldType>
        label="DOB"
        name="dob"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[
          { type: "date", message: "Entry valid entry" },
          {
            required: true,
            message: "DOB is required",
          },
        ]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Gender"
        name="gender"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Select gender",
          },
        ]}
      >
        <Select
          defaultValue=""
          options={[
            {
              value: "",
              label: "Select Gender",
            },
            {
              value: "male",
              label: "Male",
            },
            {
              value: "female",
              label: "Female",
            },
          ]}
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="phone"
        label="Phone"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Phone number is required",
          },
        ]}
      >
        <Input name="phone" placeholder="Phone number" />
      </Form.Item>
      <Form.Item<FieldType>
        name="email"
        label="Email"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Email is required",
          },
          {
            type: "email",
            message: "Invalid email",
          },
        ]}
      >
        <Input name="email" placeholder="Email address" />
      </Form.Item>
      <Form.Item<FieldType>
        name="address"
        label="Res. Address"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Address is required",
          },
        ]}
      >
        <Input name="address" placeholder="Residential Address" />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button htmlType="submit">
          Continue <RightOutlined />{" "}
        </Button>
      </Form.Item>
    </>
  );
};

export default PersonalInfoForm;
