import Title from "./Title.jsx";
import styles from "./Card.module.css";

function Card({
  title,
  description,
  headerAction,
  children,
  className = "",
  scrollHeight, // "300px" | "100%" | undefined
}) {
  const contentStyle = scrollHeight
    ? { maxHeight: scrollHeight, overflowY: "auto" }
    : {};

  return (
    <div className={`${styles.card} ${className}`}>
      {title && (
        <Title level={3} action={headerAction}>
          {title}
        </Title>
      )}
      {description && <p className={styles.description}>{description}</p>}
      <div style={contentStyle}>{children}</div>
    </div>
  );
}

export default Card;