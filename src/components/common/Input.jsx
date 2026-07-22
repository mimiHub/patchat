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
  options = [],
  error,
  size = "md",
  resizable = false,
}) {
  const sizeClass = styles[`size_${size}`];

  if (type === "select") {
    return (
      <div className={styles.field}>
        <select
          className={`${variant === "plain" ? styles.plain : styles.input} ${sizeClass} ${error ? styles.inputError : ""}`}
          value={value}ㅋ
          onChange={onChange}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className={styles.field}>
        <textarea
          className={[
            variant === "plain" ? styles.plain : styles.input,
            sizeClass,
            resizable ? styles.resizable : styles.notResizable,
            error ? styles.inputError : "",
          ]
            .filter(Boolean)
            .join(" ")}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }

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

  if (type === "switch") {
    return (
      <label className={styles.switchLabel}>
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
        className={`${styles.submitButton} ${sizeClass}`}
      />
    );
  }

  if (type === "file") {
    return (
      <input type="file" onChange={onChange} className={styles.fileInput} />
    );
  }

  return (
    <div className={styles.field}>
      <input
        type={type}
        className={`${variant === "plain" ? styles.plain : styles.input} ${sizeClass} ${error ? styles.inputError : ""}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default Input;