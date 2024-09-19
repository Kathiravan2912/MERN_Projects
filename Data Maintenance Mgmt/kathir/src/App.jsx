import "./App.css";
import NormalEmployee from "./homepage/normalEmployee";
import Customers from "./homepage/Customers";
import BankEvent from "./homepage/BankEvent";
import BankAwards from "./homepage/BankAwards";
// import Aboutus from "./homepage/Aboutus";
import Login from "./components/Login";
import AdminManagement from "./homepage/AdminManagement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/sidebar";
import Header from "./layout/header";
import Footer from "./layout/footer";
import DashBoard from "./components/DashBoard";
// import { EventProvider } from './contexts/EventContext';
// import LandingPage from "./adminpanel/LandingPage";

const Auth = localStorage.getItem("isAuth");
function App() {
  return (
    // <LandingPage />
    <>
      <Router>
        <Header />
        {!Auth ? (
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/signUp" element={<AdminManagement />} /> */}
          </Routes>
        ) : (
          <>
            <div className="topic">Bank of Merits - Data Management</div>

            <div className="body">
              {/* <div><Header/></div> */}
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route element={<DashBoard />} path="/" />
                  <Route element={<DashBoard />} path="/Dashboard" />
                  <Route element={<NormalEmployee />} path="/Employee" />
                  <Route element={<Customers />} path="/customers" />
                  <Route element={<BankEvent />} path="/bankEvent" />
                  <Route element={<BankAwards />} path="/bankAwards" />
                  <Route
                    element={<AdminManagement />}
                    path="/adminManagement"
                  />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
      {/* <EventProvider /> */}
      <Footer />
      
    </>
  );
}

export default App;

