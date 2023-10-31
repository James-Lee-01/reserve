import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import WelcomePage from "../WelcomePage/WelcomePage";
import FeaturePage from "../FeaturePage/FeaturePage";
import LinkPage from "../LinkPage/LinkPage";
import LoginPage from "../LoginPage/LoginPage";
import FooterPage from "../FooterPage/FooterPage";
import { useAuthContext } from "../../contexts/AuthContext";

export default function LandingPage() {
  const { isAuthenticated } =useAuthContext()
  
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
