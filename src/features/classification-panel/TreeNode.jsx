import { useState } from "react";
import styles from "./ClassificationTree.module.css";

function TreeNode({ node, depth, selectedCode, onSelect }) {
  const [isOpen, setIsOpen] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.code === selectedCode;

  function handleToggle(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function handleSelect() {
    onSelect(node);
  }

  return (
    <li>
      <div
        className={isSelected ? styles.rowActive : styles.row}
        style={{ paddingLeft: `${depth * 20}px` }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={handleToggle}
          >
            {isOpen ? "−" : "+"}
          </button>
        ) : (
          <span className={styles.toggleSpacer} />
        )}
        <span className={styles.code}>[{node.code}]</span>
        <span className={styles.label}>{node.label}</span>
      </div>

      {hasChildren && isOpen && (
        <ul className={styles.childList}>
          {node.children.map((child) => (
            <TreeNode
              key={child.code}
              node={child}
              depth={depth + 1}
              selectedCode={selectedCode}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TreeNode;