import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Flex, Card, Input, Table, Space } from "antd";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { BsEye } from "react-icons/bs";
import type { TableProps } from "antd";

type Props = {
  patients: PatientType[];
  setPatients: React.Dispatch<React.SetStateAction<PatientType[]>>;
  loading: boolean;
};

const ViewPatients = () => {
  const { patients, loading }: Props = useOutletContext();

  const items = [
    {
      title: "Dashboard",
    },
    {
      title: <span>Patients</span>,
    },
    {
      title: (
        <NavLink to="/dashboard/patients/viewPatients">View Patients</NavLink>
      ),
    },
  ];

  const columns: TableProps["columns"] = [
    {
      title: "#",
      key: "has",
      render: (_1, _2, index) => {
        return index + 1;
      },
    },
    {
      title: "Patients",
      key: "patients",
      dataIndex: "fullname",
    },
    {
      title: "Number",
      key: "nuumber",
      dataIndex: "patientId",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Flex align="center" gap={7}>
            <Link
              className="text-blue-600 font-medium "
              to={`/dashboard/patients/${record.id}`}
            >
              <Space>
                <BsEye />
                <span>View</span>
              </Space>
            </Link>
          </Flex>
        );
      },
    },
  ];

  let dataSource = patients.map((patient) => {
    return {
      ...patient,
      key: `${patient.patientId}-${patient.firstName?.charAt(
        1
      )}-${patient.lastName?.charAt(1)}`,
      fullname: `${patient.firstName}  ${patient.lastName}`,
    };
  });

  return (
    <main>
      <Flex align="center" justify="space-between" className="mb-5">
        <div className="heading text-xl font-medium">
          Manage Patients Details
        </div>
        <Breadcrumb separator={<RightOutlined />} items={items} />
      </Flex>
      <Card>
        <Flex align="center" justify="space-between" className="mb-5">
          <Input width={50} className="w-1/4" placeholder="Search" />
        </Flex>
        <Table loading={loading} columns={columns} dataSource={dataSource} />
      </Card>
    </main>
  );
};

export default ViewPatients;
