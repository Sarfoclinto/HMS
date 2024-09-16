import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
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
import {
  NavLink,
  useOutletContext,
  useParams,
  useNavigate,
} from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
const items = [
  {
    title: "Dashboard",
  },
  {
    title: <span>Patients</span>,
  },
  {
    title: (
      <NavLink to="/dashboard/patients/updatePatients">Update Patients</NavLink>
    ),
  },
];

type Props = {
  setAdd: React.Dispatch<React.SetStateAction<number>>;
  patients: PatientType[];
};
const UpdatePatients = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [updatePatient, setUpdatePatient] = useState<PatientType>();
  const { setAdd, patients }: Props = useOutletContext();
  const { updateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUpdatePatient(patients.find((pat) => pat.id === updateId));
  });

  const onFinish = (values: PatientType) => {
    const newPatient = {
      ...values,
      patientId: `P${uuid().split("-")[2]}`,
      medication: "",
    };
    setLoading(true);
    setTimeout(() => {
      fetch(`http://localhost:8000/patients/${updateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      })
        .then((res) => {
          if (!res.ok) {
            message.error("Error updating patient");
            setLoading(false);
            form.resetFields();
            throw new Error("Error updating patient");
          }
          return res.json();
        })
        .then(() => {
          setTimeout(() => {
            message.success("Patient updated successfully!!!", 2);
            setAdd((prev: number) => prev + 1);
            setLoading(false);
            form.resetFields();
            navigate("/dashboard/patients/managePatients");
          }, 1500);
        })
        .catch((err) => {
          setLoading(false);
          message.info(err.message);
          form.resetFields();
        });
    }, 1000);
  };

  return (
    <>
      <main>
        <section id="header">
          <Flex align="center" justify="space-between" className="mb-5">
            <div className="heading text-xl font-medium">Update Patient</div>

            <Breadcrumb separator={<RightOutlined />} items={items} />
          </Flex>
        </section>
        {updatePatient ? (
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
                    rules={[
                      { required: true, message: "Firstname is required" },
                    ]}
                  >
                    <Input
                      placeholder="Patient Firstname"
                      allowClear
                      variant="filled"
                      defaultValue={updatePatient?.firstName}
                    />
                  </Form.Item>
                  <Form.Item<PatientType>
                    label="Last Name"
                    name="lastName"
                    key="lastname"
                    hasFeedback
                    className="w-1/2"
                    rules={[
                      { required: true, message: "Lastname is required" },
                    ]}
                  >
                    <Input
                      placeholder="Patient Lastname"
                      allowClear
                      variant="filled"
                      defaultValue={updatePatient?.lastName}
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
                    <DatePicker
                      className="w-full"
                      variant="filled"
                      // defaultValue={updatePatient?.dob}
                    />
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
                      defaultValue={updatePatient?.age}
                      formNoValidate
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
                      defaultValue={updatePatient?.address}
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
                      defaultValue={[`${updatePatient?.gender}`]}
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
                      defaultValue={updatePatient?.mobileContact}
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
                      defaultValue={updatePatient?.diagnosis}
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
                      variant="filled"
                      defaultValue={updatePatient?.category}
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
                    Update Patient
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </section>
        ) : (
          <h1 className="text-2xl font-medium">
            Loading <LoadingOutlined />
          </h1>
        )}
      </main>
    </>
  );
};

export default UpdatePatients;
