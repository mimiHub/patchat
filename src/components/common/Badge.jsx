import styles from "./Badge.module.css";

function Badge({ children, variant = "default" }) {
  return <span className={styles[variant]}>{children}</span>;
}

export default Badge;
