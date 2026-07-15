import { useState } from "react";
import TreeNode from "./TreeNode.jsx";
import Card from "../../components/common/Card.jsx";
import { classificationTree } from "./classificationData.js";
import styles from "./ClassificationTree.module.css";

function ClassificationTree() {
  const [selectedNode, setSelectedNode] = useState(classificationTree[0]);

  return (
    <div className={styles.container}>
      <div className={styles.treeWrapper}>
        <p className={styles.title}>특허분류조회</p>
        <ul className={styles.rootList}>
          {classificationTree.map((node) => (
            <TreeNode
              key={node.code}
              node={node}
              depth={0}
              selectedCode={selectedNode?.code}
              onSelect={setSelectedNode}
            />
          ))}
        </ul>
      </div>

      <div className={styles.detailWrapper}>
        {selectedNode ? (
          <Card
            className="fillCard"
            title={`[${selectedNode.code}] ${selectedNode.label}`}
            description={selectedNode.description}
          />
        ) : (
          <p className={styles.placeholder}>
            좌측 분류를 선택하면 상세 설명이 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
}

export default ClassificationTree;