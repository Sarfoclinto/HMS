import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Flex, Card, Input, Table, Space } from "antd";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { BsEye } from "react-icons/bs";
import type { TableProps } from "antd";
import { useState } from "react";

type Props = {
  patients: PatientType[];
  setPatients: React.Dispatch<React.SetStateAction<PatientType[]>>;
  loading: boolean;
};

const ViewPatients = () => {
  const { patients, loading }: Props = useOutletContext();
  const [filterby, setFilterBy] = useState("");

  const items = [
    {
      title: <NavLink to="/dashboard">Dashboard</NavLink>,
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
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <Input
            autoFocus={true}
            placeholder="Name here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            allowClear
          ></Input>
        );
      },
      onFilter: (value, record) => {
        return record.fullname.toLowerCase().includes(value);
      },
    },
    {
      title: "Number",
      key: "nuumber",
      dataIndex: "patientId",
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <Input
            placeholder="Patient ID here"
            autoFocus
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            allowClear
          ></Input>
        );
      },
      onFilter: (value, record) => {
        return record.patientId.toLowerCase().includes(value);
      },
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => {
        return (
          <Input
            placeholder="Address here"
            autoFocus
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            allowClear
          ></Input>
        );
      },
      onFilter: (value, record) => {
        return record.address.toLowerCase().includes(value);
      },
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      filters: [
        {
          text: "Inpatient",
          value: "Inpatient",
        },
        {
          text: "Outpatient",
          value: "Outpatient",
        },
        {
          text: "Choose",
          value: "Choose",
        },
      ],
      onFilter: (value, record) => {
        return record.category === value;
      },
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

  // const dataSource = (
  //   filterby
  //     ? patients.filter((patient: PatientType) =>
  //         (patient.firstName || patient.lastName)
  //           .toLowerCase()
  //           .includes(filterby.toLowerCase())
  //       )
  //     : patients
  // ).map((patient) => {
  //   return {
  //     ...patient,
  //     key: `${patient.patientId}-${patient.firstName?.charAt(
  //       1
  //     )}-${patient.lastName?.charAt(1)}`,
  //     fullname: `${patient.firstName}  ${patient.lastName}`,
  //   };
  // });

  const dataSource = patients
    .filter((patient: PatientType) => {
      if (!filterby) return true; // If no filter is applied, include all patients
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(filterby.toLowerCase());
    })
    .map((patient) => ({
      ...patient,
      key: `${patient.patientId}-${patient.firstName?.[0] || ""}-${
        patient.lastName?.[0] || ""
      }`,
      fullname: `${patient.firstName} ${patient.lastName}`,
    }));

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
          <Input
            width={50}
            className="w-1/4"
            placeholder="Search"
            value={filterby}
            onChange={(e) => setFilterBy(e.target.value)}
          />
        </Flex>
        <Table loading={loading} columns={columns} dataSource={dataSource} />
      </Card>
    </main>
  );
};

export default ViewPatients;
