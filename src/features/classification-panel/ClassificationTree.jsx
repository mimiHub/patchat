import { useState, useMemo } from "react";
import TreeNode from "./TreeNode.jsx";
import ClassificationDetail from "./ClassificationDetail.jsx";
import { classificationTree } from "./classificationData.js";
import styles from "./ClassificationTree.module.css";
import { Input, Tab, Title, Stack, Card } from "../../components/common";

const SYSTEM_TABS = [
  { label: "IPC(영문)" },
  { label: "IPC(한글)" },
  { label: "CPC(영문)" },
];

function filterTree(nodes, query) {
  if (!query.trim()) return nodes;
  const q = query.toLowerCase();

  return nodes
    .map((node) => {
      const filteredChildren = filterTree(node.children || [], query);
      const isMatch =
        node.code.toLowerCase().includes(q) ||
        node.label.toLowerCase().includes(q);

      if (isMatch || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }
      return null;
    })
    .filter(Boolean);
}

function ClassificationTree() {
  const [activeSystem, setActiveSystem] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState(classificationTree[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const visibleTree = useMemo(
    () => filterTree(classificationTree, query),
    [query],
  );

  return (
    <div className={styles.container}>
      <Stack justify="between" align="center">
        <Title level={4} className={styles.title}>특허분류조회</Title>
        {selectedNode && (
          <button
            type="button"
            className={styles.selectedBadge}
            onClick={() => setIsDetailOpen(true)}
          >
            {selectedNode.code} 분류 명세
          </button>
        )}
      </Stack>

      <Card contentClassName="card-content-stack"> 
        <Tab
        tabs={SYSTEM_TABS}
        activeIndex={activeSystem}
        onChange={setActiveSystem}
      />

      <Input
        type="text"
        placeholder="예: B03B1/00, weed"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul className={styles.rootList}>
        {visibleTree.map((node) => (
          <TreeNode
            key={node.code}
            node={node}
            depth={0}
            selectedCode={selectedNode?.code}
            onSelect={setSelectedNode}
          />
        ))}
      </ul>

      <ClassificationDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        selectedCode={selectedNode?.code}
        onBackToTree={() => setIsDetailOpen(false)}
      />
      </Card>
    </div>
  );
}

export default ClassificationTree;