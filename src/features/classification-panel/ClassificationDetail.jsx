import { Popup, Button, Card } from "../../components/common";
import { findPathToNode, classificationTree } from "./classificationData.js";
import styles from "./ClassificationDetail.module.css";

function ClassificationDetail({ isOpen, onClose, selectedCode, onBackToTree }) {
  const path = selectedCode
    ? findPathToNode(classificationTree, selectedCode)
    : [];

  return (
    <Popup isOpen={isOpen} onClose={onClose} title={`${selectedCode} 분류 명세`}>
      <div className={styles.headerRow}>
        <Button variant="secondary" size="sm" onClick={onBackToTree}>
          특허분류코드 조회
        </Button>
      </div>

      <table className={styles.table}>
        <tbody>
          {path.map((node) => (
            <tr key={node.code}>
              <td className={styles.codeCell}>{node.code}</td>
              <td className={styles.labelCell}>{node.enLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Popup>
  );
}

export default ClassificationDetail;