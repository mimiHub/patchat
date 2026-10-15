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
  variant = "outline", // "outline"(테두리 있는 카드) | "filled"(배경색만 있는 카드)
  contentClassName = "",
}) {
  let contentStyle = {};
  let rootStyle = {};
  if (scrollHeight === "100%") {
    // 카드 자체도 부모가 준 높이만큼 늘어나야, 안쪽 콘텐츠가 그 안에서
    // 스크롤될 수 있다(안 그러면 카드가 콘텐츠 크기만큼 커져서 화면 밖으로
    // 밀려나거나 잘려 보임).
    rootStyle = { flex: 1, minHeight: 0 };
    // 카드 안에서 남는 공간을 다 차지하며 내부 스크롤
    contentStyle = { flex: 1, minHeight: 0, overflowY: "auto" };
  } else if (scrollHeight) {
    // 고정 높이(px 등) 지정 시 그 높이 안에서 스크롤
    contentStyle = { maxHeight: scrollHeight, overflowY: "auto" };
  }

  const cardClassName = [
    styles.card,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClassName} style={rootStyle}>
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
