import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import styles from "./SearchBox.module.css";

function SearchBox({
  onSubmit,
  placeholder = "무엇이든 물어보세요.",
  className = "",
}) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  }

  return (
    // className: 쓰는 곳(예: 메인 페이지)에서 모양을 덧입힐 수 있게
    <div className={`${styles.searchBox} ${className}`}>
      <Input
        variant="plain"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button variant="dark" size="md" onClick={handleSubmit}>
        검색
      </Button>
    </div>
  );
}

export default SearchBox;