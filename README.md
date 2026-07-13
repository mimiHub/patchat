# Nevas — 특허 AI 챗 서비스

> 특허 관련 DB와 AI 채팅을 통해 다양한 특허를 탐색하는 서비스. Feature-based 아키텍처로 구성.

## 1. 기술 스택 & 개발 규칙

| 항목          | 내용                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 프레임워크    | React 19 + Vite                                                                                                                            |
| 라우팅        | `vite-plugin-pages` (파일 기반 라우팅, `dirs: "src/pages"`) + `react-router-dom`                                                           |
| 스타일링      | CSS Modules + 전역 유틸리티 클래스(`common.css`)                                                                                           |
| 폴더 구조     | **Feature-based** — 페이지 개수가 아니라 기능/도메인 단위로 복잡도가 커지는 구조라 채택 (야마구치는 페이지 기준 폴더링, Nevas는 기능 기준) |
| 차트          | recharts v3 (v2 → v3 마이그레이션 완료, Bar/XAxis/YAxis 등 기본 API는 breaking change 없음)                                                |
| import 관리   | 아이콘은 배럴 파일(`layouts/Nav/icons/index.js`)로 재수출                                                                                  |
| 참고 프로젝트 | 야마구치 (동일 디자인 토큰 체계 계승, `--color-primary-*`/`--color-secondary-*` 톤 스케일 패턴)                                            |

## 2. 디자인 토큰

`src/styles/variables.css`에 정의. 원시 토큰(색상 스케일)과 의미 토큰(컴포넌트별 alias)을 분리하는 방식.

### 색상 — 톤 스케일 (100~900) + Semantic + Gray

```css
--color-primary-500: #0d6efd; /* 블루 */
--color-secondary-500: #e4f2ff; /* 스카이 블루 */
--color-primary: var(--color-primary-500);
--color-secondary: var(--color-secondary-500);

--color-success: #0d9488;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

> **주의**: `--color-secondary-500`(#e4f2ff)은 명도가 매우 높은 톤이라, 100~400번대 톤 차이가 육안으로 잘 안 느껴질 수 있음. 실제 사용 시 대비가 부족하면 500 자체를 조정 검토.

### 세만틱 텍스트 / 배경 별칭

```css
--color-text-primary / --color-text-secondary / --color-text-tertiary / --color-text-inverse
--color-bg-base / --color-bg-subtle / --color-bg-muted
--border-width-thin / --color-border-default
--shadow-sm / --shadow-md
--z-index-dropdown / --z-index-tooltip
```

### Navigation 전용 토큰

```css
--nav-bg / --nav-text / --nav-text-muted
--nav-icon-color / --nav-icon-hover-color
--nav-hover-overlay / --nav-border
--nav-width-collapsed: 68px;   /* 최초 64px에서 조정 */
--nav-width-expanded: 240px;
--nav-header-height / --nav-icon-slot-size / --nav-icon-size
--nav-item-height / --nav-item-gap
```

### 컴포넌트 전용 토큰

```css
--btn-primary-bg / --btn-primary-text
--btn-secondary-bg / --btn-secondary-text  /* secondary-500이 밝아서 text는 secondary-900로 대비 확보 */
--control-height-sm/md/lg
--control-padding-x-xs/sm/md/lg
--control-font-size-sm/md/lg
```

Button, Input이 동일한 `--control-*` 값을 참조하므로 같은 size(sm/md/lg)끼리는 항상 높이가 일치함.

### 숫자형 spacing (컴포넌트 호환용)

```css
--spacing-1~5: 4px 단위 스케일
  (컴포넌트들이 --spacing-xs/sm/md 대신 숫자형으로 참조하는 경우 대응);
```

폰트 사이즈는 px 값을 rem으로 자동 변환 (`calc(px값 / 16 * 1rem)`), 브라우저 확대/축소 접근성 대응.

## 3. 사이트맵 / 라우팅 구조

```
/                    랜딩페이지 (특허 AI 챗 소개, 검색창)
├── /chat              채팅 페이지 (SidePanel 연동)
└── /components-guide  공용 컴포넌트 카탈로그 (문서화 페이지)
```

`vite-plugin-pages` 사용 시 **폴더 안 파일명이 반드시 `index.jsx`여야** 해당 폴더 경로로 라우팅됨 (`pages/chat/chat.jsx`는 `/chat/chat`이 되어버리는 문제 발견 → `index.jsx`로 통일하여 해결).

## 4. 페이지 구성

### `/` 랜딩페이지

- 상단 배너: 서비스 소개 문구 + "비지니스 제안 문의" 버튼(rounded variant)
- 히어로: 타이틀(`Title` 컴포넌트, level 1/caption) + `SuggestionList`(추천 질문 3개, 클릭 시 `/chat` 이동)
- 검색창: `SearchBox` (Input `plain` variant + Button `dark` variant 조합)
- 헤더/히어로 레이아웃 자체는 일회성이라 페이지 안에 인라인으로 유지, **반복 렌더링 로직이 있는 조각(SuggestionList)과 로컬 상태 있는 조각(SearchBox)만 컴포넌트화**

### `/chat` 채팅 페이지

- `Chat` 컴포넌트가 메인 대화 UI 렌더링
- 우측 `SidePanel`: 검색 내용에 따라 4가지 패널 타입 중 하나를 동적으로 렌더링 (`panelComponents` 매핑)
  - `accordion` → Accordion
  - `chart` → Chart (recharts BarChart)
  - `patent` → Patent (특허 상세 정보)
  - `GalleryList` → GalleryList

### `/components-guide` 컴포넌트 가이드

- 공용 컴포넌트 전체를 한 페이지에서 미리보기 (Button, Card, Input, Badge, Title, Tab, Menu, Tooltip, Popup)

## 5. Nav (사이드 네비게이션) 상세

`layouts/Nav/Nav.jsx` — 앱에서 가장 많은 반복 작업을 거친 컴포넌트.

### 핵심 인터랙션

1. **닫힘 상태**: 로고만 표시, 여닫는 토글 버튼은 숨김(`opacity: 0`). 로고 슬롯에 마우스 오버 시 로고 → 토글 버튼으로 전환(같은 위치에 `position: absolute`로 겹쳐서 opacity만 교체)
2. **열림 상태**: 로고 + 토글 버튼이 나란히 표시, 메뉴 아이템은 아이콘 + 텍스트 라벨 함께 표시
3. **히스토리 CRUD**: 각 히스토리 항목에 마우스 오버 시 더보기(⋮) 버튼 노출 → 클릭 시 컨텍스트 메뉴(이름 수정 / 고정·고정 해제 / 삭제)
   - 고정된 항목은 목록 최상단 정렬
   - 이름 수정은 인라인 입력창으로 전환 (Enter/blur 시 확정, Escape 시 취소)
   - 메뉴 바깥 클릭 시 자동 닫힘 (`useRef` + `mousedown` 이벤트, ⋮ 버튼도 ref 범위에 포함해야 두 번째 클릭 시 토글이 정상 작동함 — 초기 버전에서 이 부분 버그 있었음)

### 아이콘

`layouts/Nav/icons/`에 각 아이콘을 개별 React 컴포넌트로 구현 (`fill="currentColor"`로 통일하여 색상은 CSS `color`로 제어, 라이트/다크 대응 시 PNG 여러 장 관리 불필요). 배럴 파일(`icons/index.js`)로 한 번에 import.

- `IconSidebar` (on/off 상태별 다른 path)
- `IconNewChat`, `IconSearch`, `IconUser`
- `IconPin`, `IconMore`

## 6. 폴더 구조

```
src/
  components/
    common/   (Badge, Button, Card, Input, Menu, Popup, Tab, Title, Tooltip + .module.css)
              ※ ComingSoon, FormMessage, LabeledBox, Stack는 아직 미구현 (필요 시 추가 예정)
  layouts/
    Layout.jsx
    Nav/
      Nav.jsx, Nav.module.css
      icons/  (IconSidebar, IconNewChat, IconSearch, IconUser, IconPin, IconMore, index.js)
    SidePanel/
      SidePanel.jsx
  features/
    chat/             Chat.jsx
    accordion-panel/  Accordion.jsx
    chart-panel/      Chart.jsx (recharts v3)
    patent-panel/     Patent.jsx, Patent.module.css, patentData.js
    gallery-panel/    GalleryList.jsx, data.js
    history/          (Nav 히스토리 CRUD 로직 훅 분리 예정 — 현재 비어있음, TODO)
  pages/
    index/
      index.jsx, index.module.css
      components/  SuggestionList.jsx, SearchBox.jsx (+ .module.css)
    chat/
      index.jsx
    components-guide/
      index.jsx (라우트 엔트리, ComponentsGuide.jsx를 얇게 감쌈)
      ComponentsGuide.jsx, ComponentsGuide.module.css
  styles/
    variables.css, reset.css, common.css
  App.jsx, main.jsx
```

## 7. 데이터 확장 규칙

### 히스토리 항목 추가/수정 시

현재 `Nav.jsx` 내부 `INITIAL_HISTORY` 배열에서 관리 (`{ id, title, pinned }` 구조). 서버 연동 전까지는 컴포넌트 로컬 상태(`useState`)로만 동작. 실제 API 연결 시 `handleDelete`, `handleTogglePin`, `handleConfirmRename` 안에 API 호출 추가 필요.

### 특허 패널 데이터

`features/patent-panel/patentData.js`에서 관리.

### 갤러리 패널 데이터

`features/gallery-panel/data.js`에서 관리.

## 8. 겪었던 이슈 (참고용)

- **CSS 변수 정의 누락으로 인한 조용한 레이아웃 붕괴**: `common.css`/컴포넌트 CSS가 참조하는 변수(`--spacing-1~5`, `--color-text-primary` 등 세만틱 별칭, `--border-width-thin`, `--shadow-sm/md`, `--z-index-*`)가 `variables.css`에 실제로 정의되어 있지 않으면, 브라우저가 해당 선언 전체를 무효 처리하면서 레이아웃이 소리 없이 깨짐. 컴포넌트 CSS를 새로 작성할 때마다 실제 참조하는 변수가 `variables.css`에 있는지 대조 검증하는 습관 필요 (grep으로 `var(--...)` 목록 추출 후 대조).
- **reset.css의 `button { justify-content: center }` 전역 규칙**: 리셋 파일에 정렬 같은 "디자인 의도"가 섞여 있으면, 의도적으로 다른 정렬이 필요한 컴포넌트(Nav의 히스토리 리스트 버튼 등)가 전부 영향을 받음. 리셋은 브라우저 기본값 중립화만, 정렬/색/크기는 항상 컴포넌트 클래스에 명시하는 원칙으로 정리.
- **PowerShell `Get-Content | Set-Content`의 인코딩 이슈**: 인코딩(`-Encoding UTF8`) 명시 없이 텍스트 치환하면 한글이 깨짐. 이후 인코딩 명시하거나 VS Code 에디터에서 직접 수정하는 방식으로 전환.
- **`git mv`를 git 저장소가 아닌 곳에서 실행 시 조용히 실패**: 뒤에 이어지는 `Remove-Item`이 별개 명령이라 그대로 실행되면서 파일이 삭제되는 사고 발생 가능 — 항상 `git init` 여부 먼저 확인.
- **`vite-plugin-pages`의 라우팅 파일명 규칙**: 폴더명과 라우트 경로가 자동 매칭되는 게 아니라, 폴더 안 파일명이 `index.jsx`여야 함.
- **recharts v2 → v3 마이그레이션**: 기본적인 `BarChart`/`Bar`/`XAxis`/`YAxis`/`CartesianGrid`/`Tooltip`/`ResponsiveContainer` 조합은 breaking change 없음. `Cell`, `Customized`, `activeIndex` 등을 쓰는 경우만 마이그레이션 가이드 확인 필요.

## 9. TODO

- [ ] `features/history/`로 Nav 히스토리 CRUD 로직 커스텀 훅 분리 (`useHistoryList`)
- [ ] 히스토리 rename/pin/delete 실제 API 연동
- [ ] `ComingSoon`, `FormMessage`, `LabeledBox`, `Stack` 공용 컴포넌트 구현
- [ ] 컨텍스트 메뉴 화면 경계 감지 (하단 근처 항목에서 메뉴가 화면 밖으로 나가는 문제)
- [ ] `--shadow-sm/md`, `--z-index-*` 값 실제 디자인 시안 기준으로 재확인 (현재 임의값)
- [ ] `--color-secondary-500` 대비 부족 문제 검토

## 10. 완료된 작업 로그

- [x] Vite + React 프로젝트 초기 세팅, GitHub 저장소 연동
- [x] Nav 컴포넌트: 열림/닫힘 토글, 로고↔토글 버튼 hover 전환, 아이콘 정렬 통일
- [x] Nav 히스토리 CRUD: 이름 수정/고정/삭제 컨텍스트 메뉴, ⋮ 버튼 토글 버그 수정
- [x] 아이콘 SVG → React 컴포넌트화 (`currentColor` 기반 색상 제어), 배럴 파일 적용
- [x] 디자인 토큰 체계 정비: Primary/Secondary 톤 스케일 교체, 세만틱 텍스트/배경 별칭 추가, 누락 변수 전수 검증
- [x] 폴더 구조 유형 통일: `assets`(이미지 전용) / `styles`(reset·variables·common) 분리
- [x] Feature-based 아키텍처로 전체 재구성 (`components/panel` → `features/*-panel`, `layouts/` 분리)
- [x] 랜딩페이지 컴포넌트화 (SuggestionList, SearchBox — 페이지 전용 조각만 분리)
- [x] recharts v2 → v3 마이그레이션 (Chart.jsx 무변경 확인)
- [x] reset.css 전역 버튼 정렬 강제 이슈 해결
- [x] `vite-plugin-pages` 라우팅 파일명 규칙 통일 (`index.jsx`)
