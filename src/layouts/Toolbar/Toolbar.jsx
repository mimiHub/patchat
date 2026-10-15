import { useState } from "react";
import { Menu, Popup } from "../../components/common";
import ComponentsGuide from "../../pages/components-guide";
import { IconMore } from "../Nav/icons";
import { modelList } from "./modelData.js";
import styles from "./Toolbar.module.css";
import { useAuth } from "../../context/AuthContext.jsx";

function Toolbar() {
  const { logout } = useAuth();
  const [selectedModelId, setSelectedModelId] = useState(modelList[0].id);
  // 컴포넌트 가이드: 페이지 이동 대신 다른 기능들처럼 팝업으로 열고 닫음
  const [isGuideOpen, setIsGuideOpen] = useState(false);
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
      onClick: () => setIsGuideOpen(true),
    },
    { id: "share", label: "공유하기", onClick: () => console.log("공유하기") },
    { id: "settings", label: "설정", onClick: () => console.log("설정") },
    { id: "logout", label: "로그아웃", onClick: () => logout() },
  ];

  return (
    <header className={styles.toolbar}>
      <Menu
        label={`Patchat: ${selectedModel.label}`}
        items={modelMenuItems}
        selectedId={selectedModelId}
        variant="plain"
      />

      <div className={styles.rightSlot}>
        <Menu
          icon={<IconMore />}
          label="전체 메뉴"
          items={globalMenuItems}
          dropdownAlign="right"
        />
      </div>

      <Popup
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="컴포넌트 가이드"
        size="lg"
      >
        <ComponentsGuide />
      </Popup>
    </header>
  );
}

export default Toolbar;
