import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBox } from "../../components/common";

const SUGGESTIONS = [
  "등록된 재미있는 특허는 어떤 것이 있을까?",
  "최신 기술 분야에서 주목받는 특허는 무엇이야?",
  "특허 출원 과정은 어떻게 이루어지는지 궁금해!",
];

// 추천 질문 앞 아이콘 (↗ 화살표 - "이 질문으로 바로 가기")
function IconArrowUpRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

// 마우스를 따라 움직이는 파란 블러
// - 화면을 감싸는 .content-area에 CSS 변수(--glow-x, --glow-y)로 위치만 넘기고,
//   실제 그리기는 CSS(radial-gradient)가 담당
// - 마우스 위치로 바로 점프하지 않고 매 프레임 12%씩 따라가서 부드럽게 늦게 따라옴
// - 터치 기기(마우스 없음)나 "동작 줄이기" 설정이면 실행하지 않음 → 고정 그라데이션만
function useFollowGlow(targetRef) {
  useEffect(() => {
    const area = targetRef.current?.closest(".content-area");
    if (!area) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduceMotion.matches) return;

    // 시작 위치: 위쪽 가운데
    const rect = area.getBoundingClientRect();
    let currentX = rect.width / 2;
    let currentY = rect.height * 0.15;
    let targetX = currentX;
    let targetY = currentY;
    let frameId = null;

    function draw() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      area.style.setProperty("--glow-x", `${currentX}px`);
      area.style.setProperty("--glow-y", `${currentY}px`);

      // 거의 도착했으면 멈춤 (마우스가 멈춰 있을 때 계속 그리지 않도록)
      const isMoving =
        Math.abs(targetX - currentX) > 0.5 ||
        Math.abs(targetY - currentY) > 0.5;
      frameId = isMoving ? requestAnimationFrame(draw) : null;
    }

    function handlePointerMove(e) {
      const box = area.getBoundingClientRect();
      targetX = e.clientX - box.left;
      targetY = e.clientY - box.top;
      if (!frameId) frameId = requestAnimationFrame(draw);
    }

    area.classList.add("has-follow-glow");
    draw();
    area.addEventListener("pointermove", handlePointerMove);

    // 페이지를 떠나면 정리 (다른 페이지엔 블러가 남지 않게)
    return () => {
      area.removeEventListener("pointermove", handlePointerMove);
      if (frameId) cancelAnimationFrame(frameId);
      area.classList.remove("has-follow-glow");
      area.style.removeProperty("--glow-x");
      area.style.removeProperty("--glow-y");
    };
  }, [targetRef]);
}

function IndexPage() {
  const navigate = useNavigate();
  const landingRef = useRef(null);
  useFollowGlow(landingRef);

  function goToChat(message) {
    navigate("/chat", { state: { initialMessage: message } });
  }

  return (
    <main className="landing" ref={landingRef}>
      <div className="landing-scroll">
        {/* 가운데 한 줄 구성: 라벨 → 제목 → 설명 → 검색창 → 추천 질문 */}
        <section className="landing-hero">
          <span className="landing-badge">특허 DB × AI 채팅</span>

          <h1 className="landing-title">
            무한한 가능성을 여는 {/* 모바일에서만 줄바꿈 (PC에선 CSS로 숨김) */}
            <br className="br-mobile" />
            <span className="landing-title-accent">새로운 대화</span>의 시작
          </h1>

          <p className="landing-sub">
            특허에 관한 모든 것, <br className="br-mobile" />
            Patchat과 함께 대화해 보세요.
          </p>

          {/* 가장 중요한 행동(질문하기)을 화면 가운데로 */}
          <SearchBox onSubmit={goToChat} className="landing-searchbox" />

          {/* 추천 질문: 검색창 바로 아래 세로 리스트 (배경 없이, hover 때만 연한 배경) */}
          <ul className="suggestions">
            {SUGGESTIONS.map((text) => (
              <li key={text}>
                <button
                  type="button"
                  className="suggestion-item"
                  onClick={() => goToChat(text)}
                >
                  <span className="suggestion-icon">
                    <IconArrowUpRight />
                  </span>
                  <span className="suggestion-text">{text}</span>
                  <span className="suggestion-chevron" aria-hidden="true">
                    ›
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 서비스 소개 + 문의는 맨 아래 한 줄로 (메인 행동과 경쟁하지 않게) */}
      <footer className="landing-footer">
        <span>
          Patchat만의 특허 DB와 AI 채팅으로 다양한 특허 탐색을 제공합니다.
        </span>
        <button type="button" className="landing-link">
          비즈니스 제안 문의 →
        </button>
      </footer>
    </main>
  );
}

export default IndexPage;
