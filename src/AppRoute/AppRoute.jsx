import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";
import LoginForm from "../login/Login";
import SignupForm from "../signup/Signup";
import Home from "../home/Home";

const AppRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRoute;