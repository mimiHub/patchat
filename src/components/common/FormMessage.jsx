import styles from "./FormMessage.module.css";

function FormMessage({ variant = "error", children }) {
  return <div className={styles[variant]}>{children}</div>;
}

export default FormMessage;