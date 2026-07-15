import styles from "./Stack.module.css";

function Stack({
  children,
  direction = "row",
  gap = "sm",
  align = "center",
  justify = "start",
  wrap = false,
  mt,
  mb,
  className = "",
}) {
  const combinedClassName = [
    styles.stack,
    styles[`direction_${direction}`],
    styles[`gap_${gap}`],
    styles[`align_${align}`],
    styles[`justify_${justify}`],
    wrap ? styles.wrap : "",
    mt ? styles[`mt_${mt}`] : "",
    mb ? styles[`mb_${mb}`] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={combinedClassName}>{children}</div>;
}

export default Stack;