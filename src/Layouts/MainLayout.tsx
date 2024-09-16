import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import AppHeader from "../Components/AppHeader";
import AppSider from "../Components/AppSider";
import { useState, useEffect } from "react";
import { PatientType } from "../Modules/types";
import { message } from "antd";
import { Navigate } from "react-router-dom";

const MainLayout = () => {
  const [isloading, setLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [inPatients, setInPatients] = useState<PatientType[]>([]);
  const [outPatients, setOutPatients] = useState<PatientType[]>([]);
  const [add, setAdd] = useState<number>(0);

  const fetchPatients = () => {
    setLoading(true);
    fetch("http://localhost:8000/patients")
      .then((res) => {
        if (!res.ok) {
          message.info("Sorry, there was an error");
          throw new Error("Sorry, there was an error");
        }
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setInPatients(() => {
          return data.filter((patient: PatientType) => {
            return patient.category === "Inpatient";
          });
        });
        setOutPatients(() => {
          return data.filter((patients: PatientType) => {
            return patients.category === "Outpatient";
          });
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.info(error);
        throw new Error(error);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, [add]);

  return (
    <Layout className="mainlayout w-full h-dvh overflow-y-scroll">
      <AppHeader />
      <Layout className="w-full h-full">
        <AppSider />
        <Content className="content overflow-y-scroll bg-stone-300 px-6 pt-6">
          {sessionStorage.getItem("isAuthenticated") === "true" ? (
            <Outlet
              context={{
                patients,
                inPatients,
                outPatients,
                isloading,
                setPatients,
                setAdd,
                setInPatients,
              }}
            />
          ) : (
            <Navigate to="/" />
          )}
          <footer className="my-3 text-sm font-medium">
            2023 - 2024 &copy; <span>Hospital Management System</span>{" "}
          </footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
