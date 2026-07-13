import styles from "./Button.module.css";

function Button({
  onClick,
  children,
  variant = "primary",
  fullWidth = false,
  rounded = false,
  size = "md",
  className = "",
  type = "button",
}) {
  const combinedClassName = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth ? styles.fullWidth : "",
    rounded ? styles.rounded : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
