import styles from './Input.module.scss'

export default function Input({type, placeholder}) {
  return (

      <input className={styles.input} type={type} placeholder={placeholder} />

  );
}