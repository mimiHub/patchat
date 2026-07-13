import { useState } from "react";
import SidePanel from "../../layouts/SidePanel/SidePanel";
import Chat from "../../features/chat/Chat";

import Accordion from "../../features/accordion-panel/Accordion";
import Chart from "../../features/chart-panel/Chart";
import Patent from "../../features/patent-panel/Patent";
import GalleryList from "../../features/gallery-panel/GalleryList";

const panelComponents = {
  accordion: Accordion,
  chart: Chart,
  patent: Patent,
  GalleryList: GalleryList,
};

function ChatPage() {
  const [panelType, setPanelType] = useState(null);
  const PanelContent = panelComponents[panelType];

  return (
    <>
      <main className="chat-main">
        <Chat onPanelOpen={(type) => setPanelType(type)} />
      </main>

      {panelType && (
        <SidePanel onClose={() => setPanelType(null)}>
          <PanelContent />
        </SidePanel>
      )}
    </>
  );
}

export default ChatPage;
