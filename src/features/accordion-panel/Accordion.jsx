import { useState } from "react";

function Cup({ guest, description }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <li>
      <button
        onClick={handleToggle}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span>{isOpen ? "−" : "+"}</span>
        <span>[{guest}] accordion list</span>
      </button>
      {isOpen && <p>{description}</p>}
    </li>
  );
}

function Accordion() {
  return (
    <div className="accordion-container">
      <h2>아코디언 컴포넌트</h2>
      <ul>
        <Cup guest={1} description="첫 번째 항목에 대한 상세 설명입니다." />
        <Cup guest={2} description="두 번째 항목에 대한 상세 설명입니다." />
        <Cup guest={3} description="세 번째 항목에 대한 상세 설명입니다." />
      </ul>
    </div>
  );
}

export default Accordion;
