function SidePanel({ onClose, children }) {
  return (
    <aside className="side-panel">
      <div className="side-panel-header">
        <button className="panel-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="side-panel-content">{children}</div>
    </aside>
  );
}

export default SidePanel;
