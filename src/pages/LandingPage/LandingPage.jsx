import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import WelcomePage from "../WelcomePage/WelcomePage";
import FeaturePage from "../FeaturePage/FeaturePage";
import LinkPage from "../LinkPage/LinkPage";
import LoginPage from "../LoginPage/LoginPage";
import FooterPage from "../FooterPage/FooterPage";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HomePage />
      <WelcomePage />
      <FeaturePage />
      <LinkPage />      
      <LoginPage />
      <FooterPage />
    </>
  );
}
