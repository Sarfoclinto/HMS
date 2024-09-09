import { Outlet, useOutletContext } from "react-router-dom";
import { PatientType } from "../../Modules/types";
import { Patient } from "../../Modules/types";

type Props = {
  patients: PatientType[];
  setPatients: React.Dispatch<React.SetStateAction<Partial<Patient>[]>>;
  loading: boolean;
};
const Patients = () => {
  const { patients, setPatients, loading }: Props = useOutletContext();

  
  return <Outlet context={{ patients, setPatients, loading }} />;
};

export default Patients;
