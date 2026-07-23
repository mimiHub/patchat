import { useState } from "react";
import SidePanel from "../../layouts/SidePanel/SidePanel";
import Chat from "../../features/chat/Chat";

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

      {panelType && panelType !== "techTask" && PanelContent && (
        <SidePanel onClose={() => setPanelType(null)}>
          <PanelContent
            selectedPatentId={selectedPatentId}
            onSelectPatentId={setSelectedPatentId}
            onViewMore={() => setPanelType("GalleryList")}
          />
        </SidePanel>
      )}

      {panelType === "techTask" && (
        <div className="full-panel-overlay">
          <button
            type="button"
            className="full-panel-close"
            onClick={() => setPanelType(null)}
          >
            ✕
          </button>
          <div className="full-panel-body">
            <TechTask
              selectedPatentId={selectedPatentId}
              onSelectPatentId={setSelectedPatentId}
              onViewMore={() => setPanelType("GalleryList")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
