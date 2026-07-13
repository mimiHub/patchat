import styles from "./Input.module.css";

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  checked,
  label,
  onClick,
  variant = "outlined",
}) {
  if (type === "textarea") {
    return (
      <textarea
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }

  // 커스텀 체크박스
  if (type === "checkbox") {
    return (
      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <span className={styles.customCheckbox}></span>
        {label}
      </label>
    );
  }

  // 커스텀 라디오
  if (type === "radio") {
    return (
      <label className={styles.checkLabel}>
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <span className={styles.customRadio}></span>
        {label}
      </label>
    );
  }

  // 커스텀 스위치(토글)
  if (type === "switch") {
    return (
      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.hiddenInput}
        />
        <span className={styles.customSwitch}></span>
        {label}
      </label>
    );
  }

  if (type === "submit" || type === "button") {
    return (
      <input
        type={type}
        value={value}
        onClick={onClick}
        className={styles.submitButton}
      />
    );
  }

  if (type === "file") {
    return (
      <input type="file" onChange={onChange} className={styles.fileInput} />
    );
  }

  return (
    <input
      type={type}
      className={variant === "plain" ? styles.plain : styles.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
