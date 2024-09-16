import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./Pages/Dashboard";
import RegisterPatients from "./Pages/Patients/RegisterPatients";
import ViewPatients from "./Pages/Patients/ViewPatients";
import ManagePatients from "./Pages/Patients/ManagePatients";
import DischargePatients from "./Pages/Patients/DischargePatients";
import TransferPatients from "./Pages/Patients/TransferPatients";
import Patients from "./Pages/Patients/Patients";
import ViewPatientDetails from "./Pages/Patients/ViewPatientDetails";
import UpdatePatients from "./Pages/Patients/UpdatePatients";
import TransferDetails from "./Pages/Patients/TransferDetails";
const App: React.FC = () => {
  return (
    <div className="app min-h-dvh overflow-y-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />}>
              <Route path="registerPatients" element={<RegisterPatients />} />
              <Route
                path="updatePatient/:updateId"
                element={<UpdatePatients />}
              />
              <Route path="viewPatients" element={<ViewPatients />} />
              <Route path=":id" element={<ViewPatientDetails />} />
              <Route path="managePatients" element={<ManagePatients />} />
              <Route path="dischargePatients" element={<DischargePatients />} />
              <Route path="patientsTransfer" element={<TransferPatients />} />
              <Route
                path="transferPatient/:transferId"
                element={<TransferDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
