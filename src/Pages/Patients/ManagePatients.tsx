import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb, Flex, Card, Input, Button, Table } from "antd";
import { NavLink } from "react-router-dom";

const ManagePatients = () => {
  const items = [
    {
      title: "Dashboard",
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
  return (
    <main>
      <Flex align="center" justify="space-between">
        <div className="heading text-xl font-medium">
          Manage Patients Details
        </div>
        <Breadcrumb separator={<RightOutlined />} items={items} />
      </Flex>
      <Card>
        <Flex align="center" justify="space-between" className="mb-5">
          <Input width={50} className="w-1/4" placeholder="Search" />
          {true && (
            <Button size="middle" danger type="primary">
              Delete
            </Button>
          )}
        </Flex>
        <Table />
      </Card>
    </main>
  );
};

export default ManagePatients;
