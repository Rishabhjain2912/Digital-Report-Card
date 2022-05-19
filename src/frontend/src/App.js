import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Navbar2 from "./components/templates/Navbar2";
import Profile from "./components/users/Profile";
import S_dashboard from "./components/users/S_dashboard";
import T_dashboard from "./components/users/T_dashboard";
import T_addclass from "./components/users/T_addclass";
import T_addexam from "./components/users/T_addexam";
import T_grades from "./components/users/T_grades";
import T_lsgrades from "./components/users/T_lsgrades";
import T_lifeskills from "./components/users/T_lifeskills";
import S_analysis from "./components/users/S_analysis";
import T_addgrades from "./components/users/T_addgrades";
import T_addgrade from "./components/users/T_addgrade";
import S_gradeAnalysis from "./components/users/S_gradeAnalysis";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout2 = () => {
  return (
    <div>
      <Navbar2 />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout2 />}>
          <Route path="profile" element={<Profile />} />
          <Route path="T_lifeskills" element={<T_lifeskills />} />
          <Route path="S_dashboard" element={<S_dashboard />} />
          <Route path="T_dashboard" element={<T_dashboard />} />
          <Route path="T_addclass" element={<T_addclass />} />
          <Route path="T_addexam" element={<T_addexam />} />
          <Route path="T_grades" element={<T_grades />} />
          <Route path="T_lsgrades" element={<T_lsgrades />} />
          <Route path="S_analysis" element={<S_analysis />} />
          <Route path="T_addgrades" element={<T_addgrades />} />
          <Route path="T_addgrade" element={<T_addgrade />} />
          {/* <Route path="S_gradeAnalysis" element={<S_gradeAnalysis />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
