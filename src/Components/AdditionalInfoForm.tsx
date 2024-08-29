import { LeftOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Select } from "antd";
import { FieldType } from "../Modules/types";
import { useState } from "react";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  submitData: () => void;
};

const AdditionalInfoForm = ({ setActiveTab, loading, submitData }: Props) => {
  const languages = [
    { value: "", label: "Select Language" },
    { value: "english", label: "English" },
    { value: "mandarin", label: "Mandarin Chinese" },
    { value: "hindi", label: "Hindi" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "ghanaian", label: "Ghanaian Language" },
  ];
  const relationship = [
    {
      value: "",
      label: "Select Relationship",
    },
    {
      value: "spouse",
      label: "Spouse",
    },
    {
      value: "parent",
      label: "Parent",
    },
    {
      value: "sibling",
      label: "Sibling",
    },
    {
      value: "relative",
      label: "Relative",
    },
  ];

  const [disabled, setDisabled] = useState<boolean>(false);

  const btnOnClick = () => {
    setTimeout(() => {
      setDisabled(true);
      message.success("Information verified");
    }, 1500);
  };

  return (
    <>
      <Form.Item<FieldType>
        label="Select Language"
        name="language"
        rules={[{ required: true, message: "Field is required" }]}
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
      >
        <Select defaultValue={[""]} options={languages} />
      </Form.Item>
      <Form.Item<FieldType>
        label="NHIS No"
        name="nhisNumber"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[
          { required: true, message: "Feild is required" },
          { min: 10, message: "NHIS number can't be less than 10" },
        ]}
      >
        <Input.OTP size="middle" length={10} variant="filled" />
      </Form.Item>
      <h1 className="text-lg font-bold mb-5">Emergency Contact:</h1>
      <Form.Item<FieldType>
        label="Name"
        name="emgName"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[{ required: true, message: "Feild is required" }]}
      >
        <Input name="emgName" placeholder="Emergency Contact name" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Relationship"
        name="emgRelationship"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[{ required: true, message: "Feild is required" }]}
      >
        <Select options={relationship} defaultValue={[""]} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Phone"
        name="emgPhone"
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
        rules={[{ required: true, message: "Feild is required" }]}
      >
        <Input name="phone" placeholder="Emergency Phone number" />
      </Form.Item>
      <Form.Item>
        <Flex align="center" justify="space-between">
          <Button onClick={() => setActiveTab("2")}>
            <LeftOutlined /> Previous
          </Button>
          <Button
            onClick={btnOnClick}
            disabled={disabled}
            type="primary"
            loading={loading}
            htmlType="submit"
          >
            Verify <UserAddOutlined />
          </Button>
        </Flex>
      </Form.Item>
      {disabled && (
        <Flex align="center" justify="center">
          <Button
            onClick={() => {
              submitData();
            }}
            type="primary"
            htmlType="button"
          >
            Sign Up
          </Button>
        </Flex>
      )}
    </>
  );
};

export default AdditionalInfoForm;
