import { Outlet, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { Patient } from "../../Modules/types";

type Props = {
  patients: PatientType[];
  setPatients: React.Dispatch<React.SetStateAction<Partial<Patient>[]>>;
  loading: boolean;
  setAdd: React.Dispatch<React.SetStateAction<number>>;
  setInPatients: React.Dispatch<React.SetStateAction<Partial<Patient>[]>>;
  inPatients:PatientType[];
};
const Patients = () => {
  const {
    patients,
    setPatients,
    loading,
    setAdd,
    setInPatients,
    inPatients,
  }: Props = useOutletContext();

  return (
    <Outlet
      context={{
        inPatients,
        patients,
        setPatients,
        loading,
        setAdd,
        setInPatients,
      }}
    />
  );
};

export default Patients;
