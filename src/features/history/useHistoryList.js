// src/features/history/useHistoryList.js
import { useState } from "react";

export function useHistoryList(initialHistory) {
  const [history, setHistory] = useState(initialHistory);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleMoreClick(id) {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }

  function closeMenu() {
    setOpenMenuId(null);
  }

  function handleStartRename(item) {
    setEditingId(item.id);
    setEditValue(item.title);
    setOpenMenuId(null);
  }

  function handleConfirmRename(id) {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id && editValue.trim()
          ? { ...item, title: editValue.trim() }
          : item,
      ),
    );
    setEditingId(null);
  }

  function cancelRename() {
    setEditingId(null);
  }

  function handleTogglePin(id) {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item,
      ),
    );
    setOpenMenuId(null);
  }

  function handleDelete(id) {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    setOpenMenuId(null);
  }

  const sortedHistory = [...history].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned),
  );

  return {
    history: sortedHistory,
    openMenuId,
    editingId,
    editValue,
    setEditValue,
    handleMoreClick,
    closeMenu,
    handleStartRename,
    handleConfirmRename,
    cancelRename,
    handleTogglePin,
    handleDelete,
  };
}