import {
  ExclamationCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import type { FormProps } from "antd";
import { Tabs, Form, message } from "antd";
import PersonalInfoForm from "./PersonalInfoForm";
import AccountInfoForm from "./AccountInfoForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import { useState } from "react";
import { FieldType } from "../Modules/types";
import { v4 as uuid } from "uuid";

type Props = {
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpForm = ({ setClicked }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled] = useState({
    personal: activeTab === "1" ? false : true,
    account: activeTab === "2" ? false : true,
    additional: activeTab === "3" ? false : true,
  });
  const [userData, setUserData] = useState({});
  const [form] = Form.useForm();

  const submitData = () => {
    setLoading(true);
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        message.success("SignUp successful", 2);
        console.log(data);
        form.resetFields();
        setClicked("login");
        // setLoginModalOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        message.info(error, 5);
      });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Information",
      icon: <UserOutlined />,
      children: <PersonalInfoForm />,
      disabled: disabled.personal,
    },
    {
      key: "2",
      label: "Account Info",
      icon: <LockOutlined />,
      children: <AccountInfoForm setActiveTab={setActiveTab} />,
      disabled: disabled.account,
    },
    {
      key: "3",
      label: "Additional Info",
      icon: <ExclamationCircleOutlined />,
      children: (
        <AdditionalInfoForm
          setActiveTab={setActiveTab}
          setLoading={setLoading}
          loading={loading}
          submitData={submitData}
        />
      ),
      disabled: disabled.additional,
    },
  ];

  const onTablClick = (key: string) => {
    setActiveTab((prev) => {
      if (key === "1" && prev === "2") {
        form.resetFields();
        return "1";
      } else if (key === "2" && prev === "3") {
        form.resetFields();
        return "2";
      } else {
        form.resetFields();
        return "3";
      }
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setActiveTab((prev) => {
      if (prev === "1") {
        return "2";
      } else if (prev === "2") {
        return "3";
      } else {
        setUserData(() => {
          return {
            ...values,
            empId: `Emp-${values.department}-${uuid().split("-")[1]}`,
          };
        });
        return "3";
      }
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    message.info({ type: "error", content: "Fill all forms to proceed" });
  };

  return (
    <>
      <Form
        className=""
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h4 className="text-center text-stone-400 font-medium">
          Fill the formfields below to SignUp
        </h4>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          items={items}
          centered
          onTabClick={onTablClick}
        />
      </Form>
    </>
  );
};

export default SignUpForm;
