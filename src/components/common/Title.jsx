import styles from "./Title.module.css";

const weightClassMap = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  bold: styles.weightBold,
};

function Title({ children, level = 1, action, weight, className = "" }) {
  const Tag = `h${level}`;
  const weightClass = weight ? weightClassMap[weight] : "";
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