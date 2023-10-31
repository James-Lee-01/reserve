import Swal from "sweetalert2";
import styles from "./LoginPage.module.scss";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../contexts/AuthContext";
import { userSignUp } from "../../api/auth";

export default function LoginPage() {
  const location = useLocation();
  // 滾動到 LoginPage 元件
  const loginRef = useRef(null);
  useEffect(() => {
    if (location.pathname === "/login" && loginRef.current) {
      loginRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  //Toggle切換
  const [toggle, setToggle] = useState(true);
  const toggleSwitcher = () => {
    setToggle(!toggle);
  };

  //從上下文獲取login驗證
  const { login, isAuthenticated } = useAuthContext();

  const navigate = useNavigate()

  //Login Button Click
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    const data = await login({ email, password });
    if (data.success === true && data.role === 'user') {
      Swal.fire({
        toast: true,
        position: "top",
        title: "Login success",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log("Login success");
    } else {
      const message = data;

      Swal.fire({
        toast: true,
        position: "top",
        title: message,
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log(message);
      setError(message);
    }

  };

  //Sign Up Button Click
  const [emailSignUp, setEmailSignUp] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleSignUp = async () => {
    //狀態控管
    //註冊用API串接
    const signUpResult = await userSignUp({
      name: nameSignUp,
      email: emailSignUp,
      password: passwordSignUp,
      checkPassword: checkPassword,
    });

    if (signUpResult.status === "success") {
      const loginSuccess = await login({
        email: emailSignUp,
        password: passwordSignUp,
      });
      if (loginSuccess) {
        navigate("/");
      }
    } else {
      const message = JSON.stringify(signUpResult.response.data.message);

      Swal.fire({
        toast: true,
        position: "top",
        title: message,
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log(message);
      setError(message);
    }

  }

  // redirection
  useEffect(() => {
    //確認後導向主頁面
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      id='login'
      ref={loginRef}
      className={`${styles.container} ${toggle ? "" : styles.signUpActive}`}
    >
      <div className={styles.loginContainer}>
        <div className={styles.formWrapper}>
          <p className={styles.title}>Sign in</p>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(emailInput) => setEmail(emailInput)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(passwordInput) => setPassword(passwordInput)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.submitBtn} onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className={styles.containWrapper}>
          <p className={styles.title}>Hello, friend!</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            suscipit laboriosam. Est mollitia dolores nisi quisquam, cupiditate
            perspiciatis recusandae illum! Pariatur quibusdam iure veritatis
            repudiandae possimus consectetur, in modi porro?
          </p>
          <button className={styles.switchBtn} onClick={toggleSwitcher}>
            Sign Up
          </button>
        </div>
      </div>

      <div className={styles.signUpContainer}>
        <div className={styles.containWrapper}>
          <p className={styles.title}>Welcome back!</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
            suscipit laboriosam. Est mollitia dolores nisi quisquam, cupiditate
            perspiciatis recusandae illum! Pariatur quibusdam iure veritatis
            repudiandae possimus consectetur, in modi porro?
          </p>
          <button className={styles.switchBtn} onClick={toggleSwitcher}>
            Login
          </button>
        </div>
        <div className={styles.formWrapper}>
          <p className={styles.title}>Create account</p>
          <Input
            type='email'
            placeholder='Email'
            value={emailSignUp}
            onChange={(emailSignUpInput) => setEmailSignUp(emailSignUpInput)}
          />
          <Input
            type='text'
            placeholder='Name'
            value={nameSignUp}
            onChange={(nameSignUpInput) => setNameSignUp(nameSignUpInput)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={passwordSignUp}
            onChange={(passwordInput) => setPasswordSignUp(passwordInput)}
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            value={checkPassword}
            onChange={(checkPasswordInput) =>
              setCheckPassword(checkPasswordInput)
            }
          />
          <button className={styles.submitBtn} onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
