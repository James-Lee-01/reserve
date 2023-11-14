import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import WelcomePage from "../WelcomePage/WelcomePage";
import FeaturePage from "../FeaturePage/FeaturePage";
import LinkPage from "../LinkPage/LinkPage";
import LoginPage from "../LoginPage/LoginPage";
import FooterPage from "../FooterPage/FooterPage";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, role, identified } = useAuthContext();
  //prohibited and redirection
  useEffect(() => {
    if (identified) {
      if (role === "admin") {
        navigate("/admin");
      } else if (!isAuthenticated) {
        navigate("/");
      }
    }
  }, [isAuthenticated, role, navigate, identified]);
  
  return (
    <>
      <Navbar />
      <HomePage />
      <WelcomePage />
      <FeaturePage />
      <LinkPage />      
      {isAuthenticated ? null : <LoginPage />}
      <FooterPage />
    </>
  );
}
