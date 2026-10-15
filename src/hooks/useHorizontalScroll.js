import { useEffect, useRef, useState } from "react";

// 가로 스크롤 영역의 양 끝에 "더 있음"을 표시할지 계산
function readEdges(el) {
  if (!el) return { left: false, right: false };
  const maxScroll = el.scrollWidth - el.clientWidth;
  return {
    left: el.scrollLeft > 1,
    right: el.scrollLeft < maxScroll - 1,
  };
}

// 선택된(aria-selected="true") 항목이 가려져 있으면 보이도록 "가로로만" 이동
// (scrollIntoView는 바깥 페이지/팝업까지 세로로 움직일 수 있어서 scrollTo로 직접 계산)
function revealActive(el) {
  const active = el?.querySelector('[aria-selected="true"]');
  if (!el || !active) return;
  const start = active.offsetLeft;
  const end = start + active.offsetWidth;
  if (start < el.scrollLeft) {
    el.scrollTo({ left: start - 24, behavior: "smooth" });
  } else if (end > el.scrollLeft + el.clientWidth) {
    el.scrollTo({ left: end - el.clientWidth + 24, behavior: "smooth" });
  }
}

/**
 * 가로로 스크롤되는 탭/칩 목록용 훅
 * - edges: 왼쪽/오른쪽에 가려진 항목이 있는지 → 그라데이션 힌트 표시에 사용
 * - selectedKey가 바뀌면 aria-selected="true"인 항목이 보이도록 "가로로만" 스크롤
 *
 * - scrollByPage(-1 | 1): 좌우 화살표 버튼용, 보이는 폭의 80%만큼 이동
 *
 * 사용법:
 *   const { ref, edges, handleScroll, scrollByPage } = useHorizontalScroll(selectedId);
 *   <ul ref={ref} onScroll={handleScroll}> ... <li aria-selected={...}> ...
 */
export function useHorizontalScroll(selectedKey) {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  // 처음 그려질 때 + 크기가 바뀔 때 다시 계산
  // (ResizeObserver는 observe 직후 한 번 실행되므로 초기값 계산도 겸함)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 크기가 바뀌면(예: 화살표가 나타나 목록 폭이 줄어듦) 선택 항목이 다시 가려질 수 있어서 함께 처리
    const observer = new ResizeObserver(() => {
      setEdges(readEdges(el));
      revealActive(el);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 선택이 바뀌면 그 항목이 보이도록 이동
  useEffect(() => {
    revealActive(ref.current);
  }, [selectedKey]);

  function handleScroll() {
    setEdges(readEdges(ref.current));
  }

  // 화살표 버튼: 한 화면 폭의 80%씩 이동 (20%는 겹쳐 보여서 어디까지 봤는지 이어짐)
  function scrollByPage(direction) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return { ref, edges, handleScroll, scrollByPage };
}
