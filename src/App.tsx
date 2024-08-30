import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./Pages/Dashboard";
import RegisterPatients from "./Pages/Patients/RegisterPatients";
import ViewPatients from "./Pages/Patients/ViewPatients";
import ManagePatients from "./Pages/Patients/ManagePatients";
import DischargePatients from "./Pages/Patients/DischargePatients";
import TransferPatients from "./Pages/Patients/TransferPatients";
const App: React.FC = () => {
  return (
    <div className="app min-h-dvh overflow-y-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Outlet />}>
              <Route path="registerPatients" element={<RegisterPatients />} />
              <Route path="viewPatients" element={<ViewPatients />} />
              <Route path="managePatients" element={<ManagePatients />} />
              <Route path="dischargePatients" element={<DischargePatients />} />
              <Route path="patientsTransfer" element={<TransferPatients />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
