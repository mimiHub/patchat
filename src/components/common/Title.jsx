import styles from "./Title.module.css";

function Title({ children, level = 1, action, className = "" }) {
  if (level === "body") {
    return <p className={`${styles.body} ${className}`}>{children}</p>;
  }

  if (level === "caption") {
    return <p className={`${styles.caption} ${className}`}>{children}</p>;
  }

  const Tag = `h${level}`;

  if (action) {
    return (
      <div className={`${styles.titleRow} ${className}`}>
        <Tag className={styles[`level${level}`]}>{children}</Tag>
        {action}
      </div>
    );
  }

  const tagClassName = `${styles[`level${level}`]} ${className}`;
  return <Tag className={tagClassName}>{children}</Tag>;
}

export default Title;
