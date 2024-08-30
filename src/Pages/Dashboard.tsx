import { Avatar, Button, Card, Flex, Modal, Table, message } from "antd";
import { FaBed, FaUserNurse, FaUserTag, FaWheelchair } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { HiBeaker } from "react-icons/hi";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { FieldType } from "../Modules/types";
import { v4 as uuid } from "uuid";

// interface DataType {
//   key: string;
//   picture: string;
//   name: string;
//   email: string;
//   department: string;
// }

type dataSource = {
  picture: any;
  name: string;
  email: string;
  department: string;
};

const Dashboard = () => {
  const [users, setUsers] = useState<FieldType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [datasource, setDataSource] = useState<dataSource[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<FieldType>({});
  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:8000/users")
      .then((res) => {
        if (!res.ok) {
          message.info("Sorry, there was an error");
          throw new Error("Sorry, there was an error");
        }
        return res.json();
      })
      .then((data) => {
        setDataSource(() => {
          return data?.map((user: FieldType) => {
            return {
              ...user,
              picture:
                user.department === "technical" ? (
                  <Avatar icon={<BsPersonFill />} />
                ) : (
                  <Avatar icon={<BsPersonFill />} />
                ),
              name: user.fullname,
              email: user.email,
              department: user.department,
            };
          });
        });
        setUsers(data);
        setLoading(false);
        sessionStorage.setItem("users", JSON.stringify(data));
      })
      .catch((error) => {
        setLoading(false);
        message.info(error);
        throw new Error(error);
      });
  };

  const close = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const display = (record: FieldType) => {
    setModalOpen(true);
    setData(record);
    console.log("Record", record);
  };

  const columns: TableProps["columns"] = [
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "string",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => display(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <main id="dashboard" className="dashboard w-full h-full overflow-y-scroll">
      <Modal
        open={modalOpen}
        onCancel={close}
        title={"Employee Details"}
        footer={null}
      >
        {data && (
          <div className="employeeDetails ">
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">Name: &nbsp;</div>
              <span className="font-medium ">{data.fullname}</span>
            </div>
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">Gender: &nbsp;</div>
              <span className="font-medium ">{data.gender}</span>
            </div>
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">
                Department: &nbsp;
              </div>
              <span className="font-medium ">{data.department}</span>
            </div>
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">Email: &nbsp;</div>
              <span className="font-medium ">{data.email}</span>
            </div>
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">
                Preferred Language: &nbsp;
              </div>
              <span className="font-medium ">{data.language}</span>
            </div>
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">
                Residential Address: &nbsp;
              </div>
              <span className="font-medium ">{data.address}</span>
            </div>
            <div className="detail flex items-center">
              <div className="mark text-base font-medium">
                Phone Number: &nbsp;
              </div>
              <span className="font-medium ">{data.phone}</span>
            </div>
          </div>
        )}
      </Modal>
      <h1 className="text-2xl">Hopital Mangement System Dashboard</h1>
      <section id="dashboardCards" className="dashboardCards mt-5">
        <Card>
          <Flex align="center" justify="space-between">
            <Avatar
              size={55}
              icon={<FaWheelchair color="#6c62c3" />}
              className="border-2 border-purple-400"
            />
            <Flex vertical>
              <span className="text-right text-xl font-medium text-stone-500">
                1
              </span>
              <span className="text-lg text-gray-400">Out Patients</span>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex align="center" justify="space-between">
            <Avatar
              size={55}
              icon={<FaBed color="#6c62c3" />}
              className="border-2 border-purple-400"
            />
            <Flex vertical>
              <span className="text-right text-xl font-medium text-stone-500">
                3
              </span>
              <span className="text-lg text-gray-400">In Patients</span>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex align="center" justify="space-between">
            <Avatar
              size={55}
              icon={<FaUserNurse color="#6c62c3" />}
              className="border-2 border-purple-400"
            />
            <Flex vertical>
              <span className="text-right text-xl font-medium text-stone-500">
                {users.length}
              </span>
              <span className="text-lg text-gray-400">Hospital Employees</span>
            </Flex>
          </Flex>
        </Card>
        {/* first row complete */}
        {/* second row begin */}
        <Card>
          <Flex align="center" justify="space-between">
            <Avatar
              size={55}
              icon={<FaUserTag color="#6c62c3" />}
              className="border-2 border-purple-400"
            />
            <Flex vertical>
              <span className="text-right text-xl font-medium text-stone-500">
                1
              </span>
              <span className="text-lg text-gray-400">Vendors</span>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex align="center" justify="space-between">
            <Avatar
              size={55}
              icon={<HiBeaker color="#6c62c3" />}
              className="border-2 border-purple-400"
            />
            <Flex vertical>
              <span className="text-right text-xl font-medium text-stone-500">
                2
              </span>
              <span className="text-lg text-gray-400">Corporation Assets</span>
            </Flex>
          </Flex>
        </Card>
        <Card>
          <Flex align="center" justify="space-between">
            <Avatar
              size={55}
              icon={<GiMedicines color="#6c62c3" />}
              className="border-2 border-purple-400"
            />
            <Flex vertical>
              <span className="text-right text-xl font-medium text-stone-500">
                2
              </span>
              <span className="text-lg text-gray-400">Pharmaceuticals</span>
            </Flex>
          </Flex>
        </Card>
      </section>

      <section className="employeesTable mt-5 ">
        <Card>
          <h1 className="text-2xl mb-3">Hospital Employees</h1>
          <Table columns={columns} loading={loading} dataSource={datasource} />
        </Card>
        <footer className="my-3 text-sm font-medium">
          2023 - 2024 &copy; <span>Hospital Management System</span>{" "}
        </footer>
      </section>
    </main>
  );
};

export default Dashboard;