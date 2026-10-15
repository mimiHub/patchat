// src/layouts/Nav/Nav.jsx
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Nav.module.css";
import { Popup, Input, Button } from "../../components/common";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  IconLogo,
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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authView, setAuthView] = useState("login"); // "login" | "signup" | "forgot"
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, email, login, logout } = useAuth();

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

  function closeAuthPopup() {
    setIsLoginOpen(false);
    setAuthView("login");
    setForgotSent(false);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    login(loginEmail);
    setLoginPassword("");
    closeAuthPopup();
  }

  function handleLogoutClick() {
    logout();
    closeAuthPopup();
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    if (
      !signupEmail.trim() ||
      !signupPassword.trim() ||
      signupPassword !== signupPasswordConfirm
    ) {
      return;
    }
    login(signupEmail);
    setSignupPassword("");
    setSignupPasswordConfirm("");
    closeAuthPopup();
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
  }

  function handleHistoryClick(title) {
    navigate("/chat", { state: { initialMessage: title } });
  }

  return (
    <>
      {/* 모바일/태블릿: 펼쳤을 때 뒤 컨텐츠를 어둡게 덮는 배경. 누르면 닫힘 (PC에선 CSS로 숨김) */}
      {isExpanded && (
        <div
          className={styles.backdrop}
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}
    <nav
      className={`${styles.navigation} ${isExpanded ? styles.expanded : ""}`}
    >
      <div className={styles.header}>
        <div className={styles.logoSlot}>
          <Link to="/" className={styles.logo} aria-label="홈으로 이동">
            <span className={styles.icon}>
              <IconLogo className={styles.logoImage} />
            </span>
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
        <button
          type="button"
          className={styles.userLink}
          onClick={() => setIsLoginOpen(true)}
        >
          <span className={styles.icon}>
            <IconUser />
          </span>
          <span className={styles.label}>
            {isLoggedIn ? email : "사용자 정보"}
          </span>
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

      <Popup
        isOpen={isLoginOpen}
        onClose={closeAuthPopup}
        title={
          isLoggedIn
            ? "내 계정"
            : authView === "signup"
              ? "회원가입"
              : authView === "forgot"
                ? "비밀번호 찾기"
                : "로그인"
        }
        size="sm"
      >
        {isLoggedIn ? (
          <div className={styles.loggedInView}>
            <p className={styles.loggedInEmail}>{email}</p>
            <Button variant="secondary" fullWidth onClick={handleLogoutClick}>
              로그아웃
            </Button>
          </div>
        ) : authView === "signup" ? (
          <form className={styles.loginForm} onSubmit={handleSignupSubmit}>
            <Input
              type="text"
              placeholder="이메일"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={signupPasswordConfirm}
              onChange={(e) => setSignupPasswordConfirm(e.target.value)}
            />
            <Button type="submit" fullWidth>
              가입하기
            </Button>
            <button
              type="button"
              className={styles.authLinkBtn}
              onClick={() => setAuthView("login")}
            >
              ← 로그인으로 돌아가기
            </button>
          </form>
        ) : authView === "forgot" ? (
          <form className={styles.loginForm} onSubmit={handleForgotSubmit}>
            {forgotSent ? (
              <p className={styles.authMessage}>
                입력하신 이메일로 재설정 링크를 보냈어요.
              </p>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="가입한 이메일"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <Button type="submit" fullWidth>
                  재설정 링크 보내기
                </Button>
              </>
            )}
            <button
              type="button"
              className={styles.authLinkBtn}
              onClick={() => {
                setAuthView("login");
                setForgotSent(false);
              }}
            >
              ← 로그인으로 돌아가기
            </button>
          </form>
        ) : (
          <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
            <Input
              type="text"
              placeholder="이메일"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            {/* 자동로그인(왼쪽) + 회원가입/비밀번호 찾기(오른쪽) 한 줄 정렬 */}
            <div className={styles.authOptionsRow}>
              <Input
                type="switch"
                checked={autoLogin}
                onChange={() => setAutoLogin((prev) => !prev)}
                label="자동 로그인"
              />
              <div className={styles.authLinkRow}>
                <button
                  type="button"
                  className={styles.authLinkBtn}
                  onClick={() => setAuthView("signup")}
                >
                  회원가입
                </button>
                <button
                  type="button"
                  className={styles.authLinkBtn}
                  onClick={() => setAuthView("forgot")}
                >
                  비밀번호 찾기
                </button>
              </div>
            </div>

            <Button type="submit" fullWidth>
              로그인
            </Button>
          </form>
        )}
      </Popup>
    </nav>
    </>
  );
}

export default Nav;
