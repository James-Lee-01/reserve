import styles from './AddCafe.module.scss'

export default function AddCafe() {
  return (
    <div className={styles.container}>
      <div className={styles.textContent}>
        <h1 className={styles.title}>Add Your Cafe</h1>
        <div className={styles.text}>
          <p>Want to make your café shine?</p>
          <p>Need a smarter way to manage bookings?</p>
          <p>Add your café here!"</p>
        </div>
      </div>
    </div>
  );
}