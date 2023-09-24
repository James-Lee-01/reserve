import styles from "./LoginPage.module.scss";
import Input from "../../components/Input/Input";
import { useState } from "react";

export default function LoginPage() {
  const [toggle, setToggle] = useState(true)
  const toggleSwitcher = () => {
    setToggle(!toggle)
  }

  return (
    <div className={`${styles.container} ${toggle ? "" : styles.signUpActive}`}>
      <div className={styles.loginContainer}>
        <div className={styles.formWrapper}>
          <p className={styles.title}>Sign in</p>
          <Input type='email' placeholder='Email' />
          <Input type='password' placeholder='Password' />
          <button className={styles.submitBtn}>Login</button>
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
          <Input type='email' placeholder='Email' />
          <Input type='text' placeholder='Name' />
          <Input type='password' placeholder='Password' />
          <Input type='password' placeholder='Confirm Password' />
          <button className={styles.submitBtn}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
