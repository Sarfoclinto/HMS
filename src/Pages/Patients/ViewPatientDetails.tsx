import { useParams, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { useEffect, useState } from "react";
import { Breadcrumb, Card, Flex, Tabs } from "antd";
import { LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { BsPersonFillCheck } from "react-icons/bs";
import type { TabsProps } from "antd";

type Props = {
  patients: PatientType[];
  loading: boolean;
};

const ViewPatientDetails = () => {
  const { patients }: Props = useOutletContext();
  const { id } = useParams();

  const [patient, setPatient] = useState<PatientType | null>();
  const Items: TabsProps["items"] = [
    {
      key: "1",
      label: <span>Prescriptions</span>,
      children: <div>{patient?.medication}</div>,
    },
    {
      key: "2",
      label: "Vitals",
      children: "Vitals",
    },
    {
      key: "3",
      label: "Lab Records",
      children: "Lab records",
    },
  ];
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

  useEffect(() => {
    setPatient(patients.find((patient) => patient.id === id));
  });

  return (
    <>
      {patient ? (
        <main className="w-full h-full">
          <section id="header">
            <Flex align="center" justify="space-between" className="mb-5">
              <div className="heading text-xl font-medium">
                {`${patient?.firstName}  ${patient?.lastName}'s`} Profile
              </div>

              <Breadcrumb separator={<RightOutlined />} items={items} />
            </Flex>
          </section>
          <section id="viewPatientsDetailsTile" className="w-full mt-5 h-full">
            <Card className="h-fit ">
              <Flex align="center" justify="center" className="mb-5">
                <BsPersonFillCheck className="text-7xl" />
              </Flex>
              <Flex vertical gap={10}>
                <h1 className="text-base font-bold">
                  Full Name :{" "}
                  <span className="font-medium text-gray-500">{`${patient.firstName} ${patient.lastName}`}</span>{" "}
                </h1>
                <h1 className="text-base font-bold">
                  Mobile :{" "}
                  <span className="font-medium text-gray-500">{`${patient.mobileContact} `}</span>{" "}
                </h1>
                <h1 className="text-base font-bold">
                  Address :{" "}
                  <span className="font-medium text-gray-500">{`${patient.address} `}</span>{" "}
                </h1>
                <h1 className="text-base font-bold">
                  Date Of Birth :{" "}
                  <span className="font-medium text-gray-500">{`${patient.dob} `}</span>{" "}
                </h1>

                <h1 className="text-base font-bold">
                  Age :{" "}
                  <span className="font-medium text-gray-500">{`${patient.age} Years`}</span>{" "}
                </h1>
                <h1 className="text-base font-bold">
                  Ailment :{" "}
                  <span className="font-medium text-gray-500">{`${patient.diagnosis
                    ?.charAt(0)
                    .toUpperCase()}${patient.diagnosis?.slice(1)}`}</span>{" "}
                </h1>
              </Flex>
            </Card>
            <Card className="h-fit ">
              <Tabs
                defaultActiveKey="1"
                centered
                items={Items}
                type="card"
                size="middle"
                tabBarGutter={10}
              />
            </Card>
          </section>
        </main>
      ) : (
        <h1 className="text-2xl font-medium">
          Loading <LoadingOutlined />
        </h1>
      )}
    </>
  );
};

export default ViewPatientDetails;
