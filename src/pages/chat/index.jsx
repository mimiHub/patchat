import { useState } from "react";
import Chat from "../../features/chat/Chat";
import { Popup } from "../../components/common";

import ClassificationTree from "../../features/classification-panel/ClassificationTree";
import Chart from "../../features/chart-panel/Chart";
import ClusterChart from "../../features/chart-panel/ClusterChart";
import Patent from "../../features/patent-panel/Patent";
import GalleryList from "../../features/gallery-panel/GalleryList";
import TechTask from "../../features/tech-task/TechTask";
import { patentList } from "../../features/patent-panel/patentData.js";

const panelComponents = {
  classification: ClassificationTree,
  chart: Chart,
  clusterChart: ClusterChart,
  patent: Patent,
  GalleryList: GalleryList,
  techTask: TechTask,
};

const panelTitles = {
  classification: "특허분류 조회",
  chart: "막대차트 보기",
  clusterChart: "클러스터차트 보기",
  patent: "특허상세 보기",
  GalleryList: "대표도면 보기",
  techTask: "기술과제",
};

const panelSizes = {
  classification: "lg",
  chart: "lg",
  clusterChart: "lg",
  patent: "lg",
  GalleryList: "md",
  techTask: "lg",
};

function ChatPage() {
  const [panelType, setPanelType] = useState(null);
  const [selectedPatentId, setSelectedPatentId] = useState(patentList[0].id);

  const PanelContent = panelType ? panelComponents[panelType] : null;

  return (
    <div className="chat-page-row">
      <main className="chat-main">
        <Chat onPanelOpen={(type) => setPanelType(type)} />
      </main>

      <Popup
        isOpen={!!panelType}
        onClose={() => setPanelType(null)}
        title={panelType ? panelTitles[panelType] : ""}
        size={panelType ? panelSizes[panelType] : "lg"}
      >
        {PanelContent && (
          <PanelContent
            selectedPatentId={selectedPatentId}
            onSelectPatentId={setSelectedPatentId}
            onViewMore={() => setPanelType("GalleryList")}
          />
        )}
      </Popup>
    </div>
  );
}

export default ChatPage;
