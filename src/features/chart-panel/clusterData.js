export const clusterData = [
  {
    id: "all",
    label: "전체 클러스터",
    color: null,
    title: null,
    description: null,
    keywordCount: null,
    keywords: [],
  },
  {
    id: "quality",
    label: "데이터 품질 및 객관성 문제",
    color: "var(--color-primary-500)",
    title: "데이터 품질 및 객관성 문제",
    description:
      "데이터 수집 및 처리 과정에서 발생하는 품질 저하와 객관성 확보 문제를 다루는 기술군입니다.",
    keywordCount: 8,
    keywords: [
      "데이터 정합성",
      "품질 검증",
      "객관성 확보",
      "노이즈 제거",
      "이상치 탐지",
      "정규화",
      "데이터 클렌징",
      "신뢰도 평가",
    ],
  },
  {
    id: "relation",
    label: "특허 관계 유형 분석",
    color: "var(--color-warning)",
    title: "특허 관계 유형 분석",
    description:
      "특허 간 인용, 패밀리, 분할·연속 등 관계 유형을 분류하고 분석하는 기술군입니다.",
    keywordCount: 6,
    keywords: [
      "인용관계",
      "특허패밀리",
      "분할출원",
      "연속출원",
      "관계분류",
      "네트워크 분석",
    ],
  },
  {
    id: "search",
    label: "대용량 특허 데이터 검색 및 분석 기술",
    color: "var(--color-error)",
    title: "특허 데이터 기반 검색 및 분석 기술",
    description:
      "이 클러스터는 특허 데이터베이스를 효율적으로 구축하고, 대량의 특허 데이터를 신속하게 검색 및 분석하는 기술들을 포함한다. 정량적인 특허 가치 평가와 선행특허 검색 최적화를 통해 분석 시간과 데이터 처리 부하를 줄이는 방법에 중점을 둔다.",
    keywordCount: 10,
    keywords: [
      "검색시간",
      "대량데이터 검색",
      "데이터베이스 구축",
      "데이터베이스 부하",
      "선행특허 데이터베이스",
      "선행특허 데이터베이스",
      "시간단축",
      "대량데이터 측정",
      "검색 결과",
      "데이터 단축",
    ],
  },
  {
    id: "efficiency",
    label: "특허 처리 시간 및 인력 효율화",
    color: "var(--color-success)",
    title: "특허 처리 시간 및 인력 효율화",
    description:
      "특허 심사 및 처리 프로세스에서 소요되는 시간과 인력을 줄이기 위한 자동화 기술군입니다.",
    keywordCount: 7,
    keywords: [
      "심사자동화",
      "처리시간 단축",
      "인력효율화",
      "워크플로우 최적화",
      "업무 자동화",
      "AI 심사보조",
      "프로세스 개선",
    ],
  },
];

// 버블 차트용 좌표/크기 데이터 (클러스터별로 여러 개의 점을 가짐)
export const clusterBubbles = [
  { clusterId: "quality", x: 20, y: 80, z: 900 },
  { clusterId: "quality", x: 15, y: 55, z: 1400 },
  { clusterId: "quality", x: 30, y: 45, z: 500 },
  { clusterId: "quality", x: 22, y: 30, z: 400 },

  { clusterId: "relation", x: 45, y: 55, z: 700 },
  { clusterId: "relation", x: 55, y: 40, z: 600 },
  { clusterId: "relation", x: 48, y: 25, z: 500 },
  { clusterId: "relation", x: 40, y: 15, z: 550 },

  { clusterId: "search", x: 60, y: 30, z: 650 },
  { clusterId: "search", x: 65, y: 20, z: 450 },
  { clusterId: "search", x: 58, y: 10, z: 500 },
  { clusterId: "search", x: 70, y: 40, z: 600 },
  { clusterId: "search", x: 62, y: 15, z: 400 },

  { clusterId: "efficiency", x: 65, y: 75, z: 800 },
  { clusterId: "efficiency", x: 75, y: 68, z: 700 },
  { clusterId: "efficiency", x: 70, y: 60, z: 500 },
];
