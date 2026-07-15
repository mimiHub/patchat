import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import styles from "./SearchBox.module.css";

function SearchBox({ onSubmit, placeholder = "무엇이든 물어보세요." }) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  }

  return (
    <div className={styles.searchBox}>
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