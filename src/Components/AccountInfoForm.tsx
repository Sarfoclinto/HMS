import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { FieldType } from "../Modules/types";

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const AccountInfoForm = ({ setActiveTab }: Props) => {
  return (
    <>
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username is required" }]}
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
      >
        <Input name="username" placeholder="Username" allowClear />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 8, message: "password can't be less than 8 characters" },
        ]}
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
      >
        <Input.Password name="password" placeholder="Password" allowClear />
      </Form.Item>
      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Confirm Password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Password mismatch");
            },
          }),
        ]}
        wrapperCol={{ span: 30 }}
        labelCol={{ span: 7 }}
        hasFeedback
      >
        <Input.Password name="confirmPassword" placeholder="Confirm password" />
      </Form.Item>
      <Form.Item>
        <Flex align="center" justify="space-between">
          <Button onClick={() => setActiveTab("1")}>
            <LeftOutlined /> Previous
          </Button>
          <Button htmlType="submit">
            Continue <RightOutlined />
          </Button>
        </Flex>
      </Form.Item>
    </>
  );
};

export default AccountInfoForm;
