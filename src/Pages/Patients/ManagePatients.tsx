import { RightOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Flex,
  Card,
  Input,
  Button,
  Table,
  Space,
  Modal,
  message,
} from "antd";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { BiCheckSquare } from "react-icons/bi";
import type { TableProps } from "antd";
import { useState } from "react";

type Props = {
  patients: PatientType[];
  setPatients: React.Dispatch<React.SetStateAction<PatientType[]>>;
  loading: boolean;
  setAdd: React.Dispatch<React.SetStateAction<number>>;
};

type select = {
  record: PatientType;
  selectedrows: PatientType[];
  selected: boolean;
};
const ManagePatients = () => {
  const { patients, setPatients, loading, setAdd }: Props = useOutletContext();

  const [select, setSelect] = useState<select>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deletePatientRecord, setDeletePatientRecord] = useState<PatientType>();
  const [deleting, setDeleting] = useState<boolean>(false);

  const items = [
    {
      title: <NavLink to="/dashboard">Dashboard</NavLink>,
    },
    {
      title: <span>Patients</span>,
    },
    {
      title: (
        <NavLink to="/dashboard/patients/managePatients">
          Manage Patients
        </NavLink>
      ),
    },
  ];

  const openModal = (record: PatientType) => {
    setDeleteModal(true);
    setDeletePatientRecord(record);
  };

  const singleDeletePateint = () => {
    setDeleting(true);
    setTimeout(() => {
      fetch(`http://localhost:8000/patients/${deletePatientRecord?.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setAdd((prev) => prev + 1);
          setDeleting(false);
          message.success("Patient deleted Successfully", 2);
          close();
          console.log(data);
        })
        .catch((err) => {
          setDeleting(false);
          message.error(err, 2);
        });
    }, 1000);
  };

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
      key: "number",
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
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => openModal(record)}
              disabled={
                select && select?.selectedrows.length >= 2 ? true : false
              }
            >
              <Space>
                <RiDeleteBinLine />
                <span>Delete</span>
              </Space>
            </Button>
            <Link
              className="text-blue-600 font-medium "
              to={`/dashboard/patients/${record.id}`}
            >
              <Space>
                <BsEye />
                <span>View</span>
              </Space>
            </Link>
            <NavLink to={`/dashboard/patients/updatePatient/${record.id}`}>
              <Button
                size="small"
                type="primary"
                disabled={
                  select && select?.selectedrows.length >= 2 ? true : false
                }
              >
                <Space>
                  <BiCheckSquare />
                  <span>Update</span>
                </Space>
              </Button>
            </NavLink>
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
  const close = () => {
    setDeleteModal(false);
  };

  const deleteMultiplePatients = () => {
    // setMapData((prev) => {
    //   return prev.filter((task) => {
    //     return !select.selectedrows
    //       .map((selected) => selected.key)
    //       .includes(task.key);
    //   });
    // });
    setPatients((prev) => {
      return prev.filter((patient) => {
        return !select?.selectedrows
          .map((selected) => selected.id)
          .includes(patient.id);
      });
    });
    message.success("Selected Patients deleted Successfully", 2);
    close();
    setSelect(() => {
      return {
        record: {},
        selectedrows: [],
        selected: false,
      };
    });
  };
  return (
    <main>
      <Modal
        footer={null}
        onCancel={close}
        onClose={close}
        open={deleteModal}
        closable={false}
      >
        <h1 className="text-lg font-semibold">
          {select && select?.selectedrows.length >= 2 ? (
            <div>
              Are you sure you want to{" "}
              <span className="text-red-600">Delete &nbsp;</span>
              the
              <br />
              <span className="text-red-600">Selected Rows of Patients</span>
            </div>
          ) : (
            <div>
              Are you sure you want to{" "}
              <span className="text-red-600">Delete</span> patient &nbsp;
              <br />
              <span className="text-stone-500">
                {`${deletePatientRecord?.firstName}  ${deletePatientRecord?.lastName}?`}
              </span>
            </div>
          )}
        </h1>
        <Flex align="center" justify="flex-end" className="mt-3">
          <Space>
            {select && select?.selectedrows.length >= 2 ? (
              <Button type="primary" danger onClick={deleteMultiplePatients}>
                Delete
              </Button>
            ) : (
              <Button
                type="primary"
                loading={deleting}
                disabled={deleting}
                danger
                onClick={singleDeletePateint}
              >
                Delete
              </Button>
            )}
            <Button
              type="primary"
              onClick={() => {
                message.info("Delete Aborted");
                close();
              }}
            >
              Cancle
            </Button>
          </Space>
        </Flex>
      </Modal>
      <Flex align="center" justify="space-between" className="mb-5">
        <div className="heading text-xl font-medium">
          Manage Patients Details
        </div>
        <Breadcrumb separator={<RightOutlined />} items={items} />
      </Flex>
      <Card>
        <Flex align="center" justify="space-between" className="mb-5">
          <Input width={50} className="w-1/4" placeholder="Search" />
          {select && select?.selectedrows?.length >= 2 && (
            <Button
              size="middle"
              danger
              type="primary"
              onClick={() => setDeleteModal(true)}
            >
              Delete
            </Button>
          )}
        </Flex>
        <Table
          rowSelection={{
            type: "checkbox",
            onSelect: (record, selected, selectedrows) => {
              setSelect(() => {
                return {
                  selected,
                  selectedrows,
                  record,
                };
              });
            },
          }}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </main>
  );
};

export default ManagePatients;
