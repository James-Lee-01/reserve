import styles from './Input.module.scss'

export default function Input({ type, placeholder, value, onChange, required }) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      required={required}
    />
  );
}