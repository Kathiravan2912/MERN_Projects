import "../App.css";
import HigherEmployee from "../homepage";
import NormalEmployee from "../homepage/normalEmployee";
import NontechEmployee from "../homepage/nontechEmployee";
import Accountholders from "../homepage/accountholders";
import LoanPurchased from "../homepage/loanPurchased";
import SavingAccount from "../homepage/savingAccount";
import BankEvent from "../homepage/bankEvent";
import BankAwards from "../homepage/bankAwards";
import Aboutus from "../homepage/Aboutus";
import Login from "../components/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../layout/sidebar";
function  Navigation() {
  return (
    <>
    <Router>
      <div className="topic">Bank of Merits - Data Management</div>
      <div className="body">
        <div className="container">
          <Sidebar />
          <div className="main-content">
            
              <Routes>
                <Route element={<HigherEmployee />} path="/" />
                <Route element={<HigherEmployee />} path="/higherEmployee" />
                <Route element={<NormalEmployee />} path="/normalEmployee" />
                <Route element={<NontechEmployee />} path="/NontechEmployee" />
                <Route element={<Accountholders />} path="/accountholders" />
                <Route element={<LoanPurchased />} path="/loanPurchased" />
                <Route element={<SavingAccount />} path="/savingAccount" />
                <Route element={<BankEvent />} path="/bankEvent" />
                <Route element={<BankAwards />} path="/bankAwards" />
                <Route element={<Aboutus />} path="/aboutus" />
              </Routes>
           
          </div>

        </div>
      </div>
    </Router>
     
    </>
  );
}

export default Navigation;
