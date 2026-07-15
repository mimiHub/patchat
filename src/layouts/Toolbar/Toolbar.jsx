import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../components/common";
import { IconMore } from "../Nav/icons";
import { modelList } from "./modelData.js";
import styles from "./Toolbar.module.css";

function Toolbar() {
  const navigate = useNavigate();
  const [selectedModelId, setSelectedModelId] = useState(modelList[0].id);
  const selectedModel = modelList.find((m) => m.id === selectedModelId);

  const modelMenuItems = modelList.map((model) => ({
    id: model.id,
    label: model.label,
    description: model.description,
    onClick: () => setSelectedModelId(model.id),
  }));

  const globalMenuItems = [
    {
      id: "components-guide",
      label: "컴포넌트 가이드",
      onClick: () => navigate("/components-guide"),
    },
    { id: "share", label: "공유하기", onClick: () => console.log("공유하기") },
    { id: "settings", label: "설정", onClick: () => console.log("설정") },
    { id: "logout", label: "로그아웃", onClick: () => console.log("로그아웃") },
  ];

  return (
    <header className={styles.toolbar}>
      <Menu
        label={`Patchat: ${selectedModel.label}`}
        items={modelMenuItems}
        selectedId={selectedModelId}
      />

      <div className={styles.rightSlot}>
        <Menu
        icon={<IconMore />}
        label="전체 메뉴"
        items={globalMenuItems}
        dropdownAlign="right"
        />
      </div>
    </header>
  );
}

export default Toolbar;