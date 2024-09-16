import Sider from "antd/es/layout/Sider";
import { Menu, type MenuProps } from "antd";
import {
  DesktopOutlined,
  FileTextOutlined,
  ScissorOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaMoneyBill,
  FaMoneyBillTransfer,
  FaWheelchairMove,
} from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { HiBeaker } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { CgPassword } from "react-icons/cg";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "/dashboard",
    label: <NavLink to="/dashboard">Dashboard</NavLink>,
    icon: <DesktopOutlined />,
  },
  {
    key: "patients",
    label: <span>Patients</span>,
    icon: <FaWheelchairMove />,
    children: [
      {
        key: "/dashboard/patients/registerPatients",
        label: (
          <NavLink to="patients/registerPatients">Register Patient</NavLink>
        ),
      },
      {
        key: "/dashboard/patients/viewPatients",
        label: <NavLink to="patients/viewPatients">View Patient</NavLink>,
      },
      {
        key: "/dashboard/patients/managePatients",
        label: <NavLink to="patients/managePatients">Manage Patient</NavLink>,
      },
      {
        key: "/dashboard/patients/dischargePatients",
        label: (
          <NavLink to="patients/dischargePatients">Discharge Patient</NavLink>
        ),
      },
      {
        key: "/dashboard/patients/patientsTransfer",
        label: (
          <NavLink to="patients/patientsTransfer">Patient Transfer</NavLink>
        ),
      },
    ],
  },
  {
    key: "employees",
    label: <span>Employees</span>,
    icon: <MdPerson />,
    children: [
      {
        key: "addEmployee",
        label: <NavLink to="">Add Employee</NavLink>,
      },
      {
        key: "ViewEmployee",
        label: <NavLink to="">View Employee</NavLink>,
      },
      {
        key: "manageEmployee",
        label: <NavLink to="">Manage Employee</NavLink>,
      },
      {
        key: "assignDepartment",
        label: <NavLink to="">Assign Department</NavLink>,
      },
      {
        key: "transferEmployee",
        label: <NavLink to="">Transfer Employee</NavLink>,
      },
    ],
  },
  {
    key: "pharmacy",
    label: <span>Pharmacy</span>,
    icon: <GiMedicines />,
    children: [],
  },
  {
    key: "inventory",
    label: <span>Inventory</span>,
    icon: <FaMoneyBill />,
    children: [],
  },
  {
    key: "reporting",
    label: <span>Reporting</span>,
    icon: <UploadOutlined />,
    children: [],
  },
  {
    key: "medicalRecords",
    label: <span>Medical Records</span>,
    icon: <FileTextOutlined />,
    children: [],
  },
  {
    key: "laboratory",
    label: <span>Laboratory</span>,
    icon: <HiBeaker />,
    children: [],
  },
  {
    key: "surgical/theatre",
    label: <span>Surgical / Theater</span>,
    icon: <ScissorOutlined />,
    children: [],
  },
  {
    key: "payrolls",
    label: <span>Payrolls</span>,
    icon: <FaMoneyBillTransfer />,
    children: [],
  },
  {
    key: "vendors",
    label: <span>Vendors</span>,
    icon: <BsPerson />,
    children: [],
  },
  {
    key: "resetPassword",
    label: <span>Reset Password</span>,
    icon: <CgPassword />,
    children: [],
  },
];
const AppSider = () => {
  const { pathname } = useLocation();
  let defaultOpenKeys = "/dashboard";
  const locationArray = pathname.split("/");

  if (locationArray.length == 2) {
    defaultOpenKeys = "/dashboard";
  } else if (locationArray.length > 2) {
    defaultOpenKeys = locationArray[2];
  }

  return (
    <Sider
      theme="light"
      className="sider h-full min-h-[563px] overflow-y-scroll"
      title="Navigation"
    >
      <Menu
        items={items}
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[defaultOpenKeys]}
      />
    </Sider>
  );
};

export default AppSider;
