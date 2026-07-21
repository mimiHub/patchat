// src/layouts/Nav/Nav.jsx
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { Popup } from "../../components/common";
import {
  IconSidebar,
  IconNewChat,
  IconSearch,
  IconUser,
  IconPin,
  IconMore,
} from "./icons";
import { useHistoryList } from "../../features/history/useHistoryList";
import { useClickOutside } from "../../hooks/useClickOutside";

const INITIAL_HISTORY = [
  { id: "1", title: "삼성전자 최근 특허 동향 알려줘", pinned: false },
  { id: "2", title: "QLC 메모리 관련 선행특허 조사해줘", pinned: false },
  { id: "3", title: "전기차 배터리 특허 클러스터 분석", pinned: false },
  { id: "4", title: "5G 통신 특허 분류 코드 알려줘", pinned: false },
  { id: "5", title: "AI 이미지 처리 특허 리스트 보여줘", pinned: false },
  { id: "6", title: "자율주행 센서 특허 대표도면 보고싶어", pinned: false },
  { id: "7", title: "OLED 디스플레이 특허 출원 동향", pinned: false },
  { id: "8", title: "클라우드 오케스트레이션 특허 검색", pinned: false },
];

function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const {
    history,
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
  } = useHistoryList(INITIAL_HISTORY);

  useClickOutside(menuRef, closeMenu, Boolean(openMenuId));

  function handleToggle() {
    setIsExpanded((prev) => !prev);
  }

  function handleHistoryClick(title) {
    navigate("/chat", { state: { initialMessage: title } });
  }

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
            {history.map((item) => (
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
                      if (e.key === "Escape") cancelRename();
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
                      <span className={styles.historyTitle}>
                        {item.title}
                      </span>
                    </button>

                    <button
                      type="button"
                      className={styles.moreBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoreClick(item.id);
                      }}
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