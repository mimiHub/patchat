import styles from "./Title.module.css";

const weightClassMap = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  bold: styles.weightBold,
};

function Title({ children, level = 1, action, weight, className = "" }) {
  const weightClass = weight ? weightClassMap[weight] : "";

  if (level === "body") {
    return (
      <p className={`${styles.body} ${weightClass} ${className}`}>
        {children}
      </p>
    );
  }

  if (level === "caption") {
    return (
      <p className={`${styles.caption} ${weightClass} ${className}`}>
        {children}
      </p>
    );
  }

  const Tag = `h${level}`;
  const tagClassName = `${styles[`level${level}`]} ${weightClass} ${className}`;

  if (action) {
    return (
      <div className={`${styles.titleRow} ${className}`}>
        <Tag className={`${styles[`level${level}`]} ${weightClass}`}>
          {children}
        </Tag>
        {action}
      </div>
    );
  }

  return <Tag className={tagClassName}>{children}</Tag>;
}

export default Title;