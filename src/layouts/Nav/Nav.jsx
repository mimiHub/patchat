// src/components/Nav.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Nav.module.css";
import Popup from "../../components/common/Popup";
import {
  IconSidebar,
  IconNewChat,
  IconSearch,
  IconUser,
  IconPin,
  IconMore,
} from "./icons";
const INITIAL_HISTORY = [
  { id: "1", title: "GitHub에 올리기", pinned: false },
  { id: "2", title: "깃에 프로젝트 올리는 방법", pinned: false },
  { id: "3", title: "모델 선택 가이드 필요", pinned: false },
];

function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const menuRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  function handleHistoryClick(title) {
    navigate("/chat", { state: { initialMessage: title } });
  }

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  function handleToggle() {
    setIsExpanded((prev) => !prev);
  }

  function handleMoreClick(e, id) {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === id ? null : id));
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

  // 고정된 항목 먼저, 나머지는 기존 순서 유지
  const sortedHistory = [...history].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned),
  );

  return (
    <nav
      className={`${styles.navigation} ${isExpanded ? styles.expanded : ""}`}
    >
      <div className={styles.header}>
        <div className={styles.logoSlot}>
          <Link to="/" className={styles.logo} aria-label="홈으로 이동">
            <span className={styles.icon}>🏠</span>
          </Link>
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={handleToggle}
            aria-label={isExpanded ? "네비게이션 닫기" : "네비게이션 열기"}
          >
            <span className={styles.icon}>
              <IconSidebar on={isExpanded} />
            </span>
          </button>
        </div>
      </div>

      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.menuLink}>
            <span className={styles.icon}>
              <IconNewChat />
            </span>
            <span className={styles.label}>새채팅</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <button
            type="button"
            className={styles.menuLink}
            onClick={() => setIsSearchOpen(true)}
          >
            <span className={styles.icon}>
              <IconSearch />
            </span>
            <span className={styles.label}>검색</span>
          </button>
        </li>
      </ul>

      {isExpanded && (
        <div className={styles.historySection}>
          <p className={styles.sectionTitle}>최근 항목</p>
          <ul className={styles.historyList}>
            {sortedHistory.map((item) => (
              <li key={item.id} className={styles.historyItem}>
                {editingId === item.id ? (
                  <input
                    type="text"
                    className={styles.historyEditInput}
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleConfirmRename(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleConfirmRename(item.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                  />
                ) : (
                  <div
                    className={styles.historyRow}
                    ref={openMenuId === item.id ? menuRef : null}
                  >
                    <button
                      type="button"
                      className={styles.historyLink}
                      onClick={() => handleHistoryClick(item.title)}
                    >
                      {item.pinned && (
                        <span className={styles.pinMark}>
                          <IconPin className={styles.pinIcon} />
                        </span>
                      )}
                      <span className={styles.historyTitle}>{item.title}</span>
                    </button>

                    <button
                      type="button"
                      className={styles.moreBtn}
                      onClick={(e) => handleMoreClick(e, item.id)}
                      aria-label="더보기"
                    >
                      <IconMore className={styles.moreIcon} />
                    </button>

                    {openMenuId === item.id && (
                      <div className={styles.contextMenu}>
                        <button
                          type="button"
                          className={styles.menuOption}
                          onClick={() => handleStartRename(item)}
                        >
                          이름 수정
                        </button>
                        <button
                          type="button"
                          className={styles.menuOption}
                          onClick={() => handleTogglePin(item.id)}
                        >
                          {item.pinned ? "고정 해제" : "고정하기"}
                        </button>
                        <button
                          type="button"
                          className={`${styles.menuOption} ${styles.menuOptionDanger}`}
                          onClick={() => handleDelete(item.id)}
                        >
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.footer}>
        <button type="button" className={styles.userLink}>
          <span className={styles.icon}>
            <IconUser />
          </span>
          <span className={styles.label}>사용자 정보</span>
        </button>
      </div>

      <Popup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="최근 검색"
      >
        <ul className={styles.searchHistoryList}>
          {history.map((item) => (
            <li
              key={item.id}
              className={styles.searchHistoryItem}
              onClick={() => {
                setIsSearchOpen(false);
                handleHistoryClick(item.title);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </Popup>
    </nav>
  );
}

export default Nav;