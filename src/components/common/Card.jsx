import Title from "./Title.jsx";
import styles from "./Card.module.css";

function Card({ title, description, headerAction, children }) {
  return (
    <div className={styles.card}>
      {title && (
        <Title level={3} action={headerAction}>
          {title}
        </Title>
      )}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

export default Card;
