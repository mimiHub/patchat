import Title from "./Title.jsx";
import styles from "./Card.module.css";

function Card({
  title,
  description,
  headerAction,
  children,
  className = "",
  scrollHeight, // "300px" | "100%" | undefined
  size = "md", // "sm" | "md"
  contentClassName = "",
}) {
  let contentStyle = {};
  if (scrollHeight === "100%") {
    // 카드 안에서 남는 공간을 다 차지하며 내부 스크롤
    contentStyle = { flex: 1, minHeight: 0, overflowY: "auto" };
  } else if (scrollHeight) {
    // 고정 높이(px 등) 지정 시 그 높이 안에서 스크롤
    contentStyle = { maxHeight: scrollHeight, overflowY: "auto" };
  }

  const cardClassName = [styles.card, styles[`size_${size}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClassName}>
      {title && (
        <Title level={4} action={headerAction}>
          {title}
        </Title>
      )}
      {description && <p className={styles.description}>{description}</p>}
      <div className={contentClassName} style={contentStyle}>{children}</div>
    </div>
  );
}

export default Card;
