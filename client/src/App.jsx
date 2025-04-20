import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PassengerCargoRoutes from "./routes/PassengerCargoRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Applicant Routes */}
        <Route path="/*" element={<PassengerCargoRoutes />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </Router>
  );
};

export default App;
