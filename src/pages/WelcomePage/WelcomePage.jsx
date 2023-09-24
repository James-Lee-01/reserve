import styles from './WelcomePage.module.scss'

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <p className={styles.title}>Welcome</p>
        <p className={styles.info}>
          Get ready for a wonderful dining experience!
        </p>
      </div>
    </div>
  );
}