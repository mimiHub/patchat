import { useState } from "react";
import SidePanel from "../../layouts/SidePanel/SidePanel";
import Chat from "../../features/chat/Chat";

import ClassificationTree from "../../features/classification-panel/ClassificationTree";
import Chart from "../../features/chart-panel/Chart";
import ClusterChart from "../../features/chart-panel/ClusterChart";
import Patent from "../../features/patent-panel/Patent";
import GalleryList from "../../features/gallery-panel/GalleryList";
import { patentList } from "../../features/patent-panel/patentData.js";

const panelComponents = {
  accordion: ClassificationTree,
  chart: Chart,
  clusterChart: ClusterChart,
  patent: Patent,
  GalleryList: GalleryList,
};

function ChatPage() {
  const [panelType, setPanelType] = useState(null);
  const [selectedPatentId, setSelectedPatentId] = useState(patentList[0].id);
  const PanelContent = panelComponents[panelType];

  return (
    <>
      <main className="chat-main">
        <Chat onPanelOpen={(type) => setPanelType(type)} />
      </main>

      {panelType && (
        <SidePanel onClose={() => setPanelType(null)}>
          <PanelContent
            selectedPatentId={selectedPatentId}
            onSelectPatentId={setSelectedPatentId}
            onViewMore={() => setPanelType("GalleryList")}
          />
        </SidePanel>
      )}
    </>
  );
}

export default ChatPage;