# 무엇을 수정하려면 어디로 가야 하나 — 참고 가이드

"이거 어디서 고치지?" 싶을 때 이 표부터 확인하세요. Ctrl+F로 키워드 검색하면 빨라요.

## 색상 / 디자인 토큰

| 바꾸고 싶은 것                         | 파일                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------- |
| 브랜드 메인/서브 컬러 (전체)           | `src/styles/variables.css` → `--color-primary`, `--color-secondary`                     |
| 톤 스케일(연한/진한 버전)              | `variables.css` → `--color-primary-100~900`, `--color-secondary-100~900`                |
| 성공/실패/경고/안내 색                 | `variables.css` → `--color-success`, `--color-error`, `--color-warning`, `--color-info` |
| 세만틱 텍스트 색 (본문/보조/흐림/반전) | `variables.css` → `--color-text-primary/secondary/tertiary/inverse`                     |
| 배경 색 (기본/서브틀/뮤트)             | `variables.css` → `--color-bg-base/subtle/muted`                                        |
| 버튼 전용 색                           | `variables.css` → `--btn-primary-bg` 등                                                 |
| Nav(사이드바) 전용 색/크기             | `variables.css` → `--nav-*` (bg, text, icon-color, hover-overlay, width 등)             |
| 폰트 크기                              | `variables.css` → `--font-size-xs/sm/base/md/lg/xl/2xl/4xl`                             |
| 폰트 굵기                              | `variables.css` → `--font-weight-light/regular/medium/bold`                             |
| 여백(spacing) — 이름형                 | `variables.css` → `--spacing-xs~2xl`                                                    |
| 여백(spacing) — 숫자형                 | `variables.css` → `--spacing-1~5` (컴포넌트가 숫자형으로 참조하는 경우)                 |
| 버튼/인풋 높이 (sm/md/lg 공통)         | `variables.css` → `--control-height-*`, `--control-padding-x-*`                         |
| 그림자                                 | `variables.css` → `--shadow-sm`, `--shadow-md`                                          |
| z-index                                | `variables.css` → `--z-index-dropdown`, `--z-index-tooltip`                             |
| 모서리 둥글기                          | `variables.css` → `--radius-sm/md/lg/full`                                              |

> CSS 변수를 새로 참조하는 컴포넌트를 만들 땐, `variables.css`에 실제로 그 이름이 정의되어 있는지 먼저 확인하세요. 없는 변수를 참조하면 브라우저가 조용히 무시해서 레이아웃이 원인 모르게 깨집니다.

## 공용 컴포넌트 (여러 페이지에서 재사용)

| 컴포넌트  | 위치                                            | 이걸로 할 수 있는 것                                                                       |
| --------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Button`  | `components/common/Button.jsx` + `.module.css`  | variant(primary/secondary/outline/text/dark), size(sm/md/lg), rounded, fullWidth           |
| `Input`   | `components/common/Input.jsx` + `.module.css`   | type(text/textarea/checkbox/radio/switch/submit/file/date/select), variant(outlined/plain) |
| `Badge`   | `components/common/Badge.jsx` + `.module.css`   | variant(default/primary/secondary/accent/outline)                                          |
| `Card`    | `components/common/Card.jsx` + `.module.css`    | title(내부에서 Title 재사용), description, headerAction                                    |
| `Title`   | `components/common/Title.jsx` + `.module.css`   | level(1~6 숫자 / "body" / "caption"), action(우측 버튼 등 슬롯)                            |
| `Tab`     | `components/common/Tab.jsx` + `.module.css`     | tabs 배열로 렌더링, 클릭 시 activeIndex 전환                                               |
| `Menu`    | `components/common/Menu.jsx` + `.module.css`    | label + items 드롭다운, 바깥 클릭 시 자동 닫힘                                             |
| `Popup`   | `components/common/Popup.jsx` + `.module.css`   | isOpen/onClose 모달, title 옵션                                                            |
| `Tooltip` | `components/common/Tooltip.jsx` + `.module.css` | position(top/bottom/left/right), hover 시 노출                                             |

> `ComingSoon`, `FormMessage`, `LabeledBox`, `Stack`는 CSS만 있고 아직 JSX 미구현 상태입니다 (야마구치엔 있음). 필요해지면 그때 CSS 구조에 맞춰 새로 작성하세요.

## Nav / 레이아웃 관련

| 바꾸고 싶은 것                     | 파일                                                                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Nav 메뉴 항목(새채팅/검색), 로고   | `layouts/Nav/Nav.jsx` + `Nav.module.css`                                                                              |
| Nav 열림/닫힘 너비, 아이콘 크기    | `styles/variables.css`의 `--nav-width-*`, `--nav-icon-*`                                                              |
| 히스토리 목록 데이터               | `layouts/Nav/Nav.jsx`의 `INITIAL_HISTORY` 배열                                                                        |
| 히스토리 수정/고정/삭제 로직       | `layouts/Nav/Nav.jsx`의 `handleDelete`/`handleTogglePin`/`handleConfirmRename` (추후 `features/history/`로 분리 예정) |
| Nav 아이콘 (SVG)                   | `layouts/Nav/icons/` 각 파일 (배럴: `icons/index.js`)                                                                 |
| Nav/페이지 콘텐츠를 감싸는 전체 틀 | `layouts/Layout.jsx`                                                                                                  |
| 채팅 우측 패널 열고 닫기           | `layouts/SidePanel/SidePanel.jsx`                                                                                     |

## 패널(Feature) 관련 — `/chat`에서 동적으로 렌더링되는 것들

| 패널 타입     | 위치                                                    | 데이터 파일                           |
| ------------- | ------------------------------------------------------- | ------------------------------------- |
| `accordion`   | `features/accordion-panel/Accordion.jsx`                | -                                     |
| `chart`       | `features/chart-panel/Chart.jsx` (recharts v3 BarChart) | 컴포넌트 내부 `data` 배열             |
| `patent`      | `features/patent-panel/Patent.jsx` + `.module.css`      | `features/patent-panel/patentData.js` |
| `GalleryList` | `features/gallery-panel/GalleryList.jsx`                | `features/gallery-panel/data.js`      |

패널 타입 ↔ 컴포넌트 매핑은 `pages/chat/index.jsx`의 `panelComponents` 객체에서 관리합니다. 새 패널 타입 추가 시:

1. `features/`에 새 폴더 생성 (예: `features/new-panel/`)
2. `pages/chat/index.jsx`의 `panelComponents`에 키 추가
3. `Chat.jsx`에서 `onPanelOpen("새키")`로 호출하는 버튼 추가

## 페이지별 파일 위치

| 페이지(URL)         | 파일                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------- |
| `/` 랜딩            | `pages/index/index.jsx` + `pages/index/components/SuggestionList.jsx`, `SearchBox.jsx` |
| `/chat`             | `pages/chat/index.jsx`                                                                 |
| `/components-guide` | `pages/components-guide/index.jsx`(라우트 엔트리) + `ComponentsGuide.jsx`(실제 구현체) |

> `vite-plugin-pages`는 **폴더 안 파일명이 `index.jsx`여야** 그 폴더 경로로 라우팅됩니다. `chat.jsx`처럼 폴더명과 다른 이름을 쓰면 `/chat/chat`처럼 의도치 않은 하위 경로가 생깁니다.

## 랜딩페이지 조각 컴포넌트

| 바꾸고 싶은 것                | 파일                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| 추천 질문 3개 문구            | `pages/index/index.jsx`의 `SUGGESTIONS` 배열                            |
| 추천 질문 리스트 UI/동작      | `pages/index/components/SuggestionList.jsx` + `.module.css`             |
| 검색창 UI/동작                | `pages/index/components/SearchBox.jsx` + `.module.css`                  |
| 상단 배너 문구, 히어로 타이틀 | `pages/index/index.jsx` 안에 인라인 (재사용 안 하므로 컴포넌트화 안 함) |

## 전역 유틸리티 클래스 (CSS Modules 아님, 문자열로 바로 사용)

| 클래스                                                           | 파일                | 용도               |
| ---------------------------------------------------------------- | ------------------- | ------------------ |
| `align-left`, `align-center`, `align-right`, `alignSpaceBetween` | `styles/common.css` | flex 정렬 유틸리티 |
| `fullWidth`                                                      | `styles/common.css` | 너비 100%          |

## 자주 헷갈리는 것 정리

- **`styles.xxx`** (import한 CSS Module) vs **`"문자열"`** (전역 클래스): 그 컴포넌트만의 스타일이면 `styles.xxx`, 프로젝트 전체에서 재사용하는 정렬 규칙 등은 `common.css`의 문자열 클래스
- **화면이 갑자기 빈 페이지 / 레이아웃만 깨짐**: 대부분 (1) `variables.css`에 없는 CSS 변수를 참조 중이거나 (2) import 경로가 실제 파일 위치와 안 맞음 — 브라우저 콘솔(F12) 에러부터 확인
- **CSS 값을 바꿨는데 안 먹힘**: `reset.css`의 element 선택자(`button` 등)가 의도보다 강하게 적용 중일 수 있음 — 개발자도구에서 취소선 그어진 스타일 확인
- **`/chat`, `/components-guide` 등 새 페이지 폴더 추가할 때**: 파일명을 꼭 `index.jsx`로 — 폴더명과 같은 이름(`chat.jsx`)으로 하면 라우팅이 한 단계 더 들어감
- **한글 파일을 PowerShell로 직접 수정할 때**: `Get-Content`/`Set-Content`에 `-Encoding UTF8`을 꼭 명시 — 안 그러면 한글이 깨질 수 있음
