import { Card, Flex, Breadcrumb } from "antd";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import TransferDetailForm from "../../Components/TransferDetailForm";
import { PatientType } from "../../Modules/types";
import { useState } from "react";

const TransferDetails = () => {
  const { patients }: { patients: PatientType[] } = useOutletContext();
  const { transferId } = useParams();
  const items = [
    {
      title: <NavLink to="/dashboard">Dashboard</NavLink>,
    },
    {
      title: <span>Patients</span>,
    },
    {
      title: (
        <NavLink to="/dashboard/patients/patientsTransfer">
          Transfer Details
        </NavLink>
      ),
    },
  ];

  const transferPatient = patients.find((patient) => {
    return patient.id === transferId;
  });

  const [transferDetails, setTransferDetails] = useState({
    name: `${transferPatient?.firstName} ${transferPatient?.lastName}`,
    referralHospital: "",
    transferDate: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setTransferDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log(transferDetails);
  return (
    <main>
      <Flex align="center" justify="space-between" className="mb-5">
        <div className="heading text-xl font-medium">
          Transfer Patient To A Referral Facility
        </div>
        <Breadcrumb separator={<RightOutlined />} items={items} />
      </Flex>
      <Card>
        <h1 className="text-lg font-semibold">Fill all fields</h1>
        <TransferDetailForm
          name={transferDetails.name}
          referralHospital={transferDetails.referralHospital}
          transferDate={transferDetails.transferDate}
          onChange={onChange}
        />
      </Card>
    </main>
  );
};

export default TransferDetails;
