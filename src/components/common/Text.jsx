import styles from "./Text.module.css";

const weightClassMap = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  bold: styles.weightBold,
};

function Text({ 
  children, 
  variant = "body",    // 스타일 종류 ("body", "caption" 등)
  as = "p",            // 렌더링할 HTML 태그 (기본값: p)
  weight, 
  className = "" 
}) {
  const Component = as; // 동적 태그 지정 (span, p, div 등)
  const weightClass = weight ? weightClassMap[weight] : "";
  const variantClass = styles[variant] || styles.body;

  return (
    <Component className={`${variantClass} ${weightClass} ${className}`}>
      {children}
    </Component>
  );
}

export default Text;