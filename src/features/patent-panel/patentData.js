export const patentList = [
  {
    id: 1,
    patentNumber: "10-2023-0012345",
    title: "QLC 메모리 셀의 데이터 저장 방법",
    applicant: "삼성전자",
    inventor: "홍길동",
    techCategory: "반도체 메모리",
    status: "심사중(Pending)",
    summary:
      "본 발명은 QLC(Quad-Level Cell) 메모리에서 데이터를 효율적으로 저장하는 방법에 관한 것이다.",
    claims:
      "1. QLC 메모리 셀에 데이터를 기록하는 단계; 2. 기록된 데이터를 검증하는 단계를 포함하는 방법.",
    specification:
      "본 발명의 상세한 설명: QLC 메모리는 셀당 4비트를 저장할 수 있어 고집적화에 유리하다...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
      { url: "https://placehold.co/600x400?text=Fig.3", alt: "도면 3" },
    ],
  },
  {
    id: 2,
    patentNumber: "10-2023-0067890",
    title: "TLC 플래시 메모리의 신뢰성 향상 기법",
    applicant: "SK하이닉스",
    inventor: "김철수",
    techCategory: "반도체 메모리",
    status: "등록(Registered)",
    summary:
      "TLC(Triple-Level Cell) 플래시 메모리의 데이터 신뢰성을 향상시키는 기법에 관한 발명이다.",
    claims: "1. TLC 셀의 전압 레벨을 보정하는 단계를 포함하는 방법.",
    specification:
      "TLC 메모리는 셀당 3비트를 저장하며, 본 발명은 오류 정정 코드를 적용하여...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
    ],
  },
  {
    id: 3,
    patentNumber: "10-2023-0099999",
    title: "낸드 플래시 웨어 레벨링 알고리즘",
    applicant: "마이크론",
    inventor: "이영희",
    techCategory: "저장장치 제어",
    status: "심사중(Pending)",
    summary:
      "낸드 플래시 메모리의 수명을 연장하기 위한 웨어 레벨링 알고리즘에 관한 것이다.",
    claims:
      "1. 각 블록의 사용 빈도를 추적하는 단계; 2. 사용 빈도에 따라 데이터를 재배치하는 단계.",
    specification:
      "웨어 레벨링은 플래시 메모리의 모든 블록이 균등하게 마모되도록 하는 기술로...",
    drawings: [{ url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" }],
  },
  {
    id: 4,
    patentNumber: "10-2022-0154321",
    title: "전기차용 배터리 열관리 시스템",
    applicant: "LG에너지솔루션",
    inventor: "박민수",
    techCategory: "배터리 관리",
    status: "등록(Registered)",
    summary:
      "본 발명은 전기차 배터리 팩의 온도를 실시간으로 모니터링하고 냉각/가열을 자동 제어하는 열관리 시스템에 관한 것이다.",
    claims:
      "1. 배터리 셀 온도를 센싱하는 단계; 2. 임계값 초과 시 냉각 유로를 개방하는 단계를 포함하는 방법.",
    specification:
      "본 시스템은 다수의 온도 센서와 유체 순환 회로를 포함하며, 배터리 수명 연장 및 화재 예방 효과가 있다...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
    ],
  },
  {
    id: 5,
    patentNumber: "10-2023-0203847",
    title: "딥러닝 기반 이미지 노이즈 제거 방법",
    applicant: "네이버",
    inventor: "정다은",
    techCategory: "인공지능",
    status: "심사중(Pending)",
    summary:
      "본 발명은 합성곱 신경망을 이용하여 저조도 환경에서 촬영된 이미지의 노이즈를 효과적으로 제거하는 방법에 관한 것이다.",
    claims:
      "1. 입력 이미지를 인코더에 통과시키는 단계; 2. 노이즈 맵을 추정하는 단계; 3. 원본에서 노이즈를 감산하는 단계.",
    specification:
      "본 발명의 신경망 구조는 U-Net 기반이며, 다양한 조도 조건에서 학습된 데이터셋을 사용한다...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
      { url: "https://placehold.co/600x400?text=Fig.3", alt: "도면 3" },
      { url: "https://placehold.co/600x400?text=Fig.4", alt: "도면 4" },
    ],
  },
  {
    id: 6,
    patentNumber: "10-2021-0098765",
    title: "5G 통신망에서의 빔포밍 최적화 방법",
    applicant: "삼성전자",
    inventor: "최유진",
    techCategory: "무선통신",
    status: "등록(Registered)",
    summary:
      "본 발명은 5G 밀리미터파 대역에서 빔의 방향을 동적으로 조정하여 통신 품질을 향상시키는 방법에 관한 것이다.",
    claims: "1. 단말의 위치 정보를 수신하는 단계; 2. 빔 방향을 재계산하는 단계.",
    specification:
      "본 발명은 기지국과 단말 간 신호 세기를 지속적으로 측정하여 빔포밍 계수를 갱신한다...",
    drawings: [{ url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" }],
  },
  {
    id: 7,
    patentNumber: "10-2023-0145678",
    title: "OLED 디스플레이의 번인 방지 구동 방법",
    applicant: "LG디스플레이",
    inventor: "한지훈",
    techCategory: "디스플레이",
    status: "심사중(Pending)",
    summary:
      "본 발명은 OLED 패널의 픽셀별 열화 정도를 추적하여 구동 전류를 보정함으로써 번인 현상을 방지하는 방법에 관한 것이다.",
    claims:
      "1. 픽셀 발광 시간을 누적 기록하는 단계; 2. 누적값에 따라 전류를 보정하는 단계.",
    specification:
      "본 발명은 픽셀 열화 모델을 기반으로 실시간 보정 알고리즘을 적용하여 화면 잔상을 최소화한다...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
    ],
  },
  {
    id: 8,
    patentNumber: "10-2022-0187654",
    title: "자율주행 차량의 보행자 인식 시스템",
    applicant: "현대자동차",
    inventor: "윤서연",
    techCategory: "자율주행",
    status: "등록(Registered)",
    summary:
      "본 발명은 라이다와 카메라 센서 융합을 통해 저조도 및 악천후 환경에서도 보행자를 정확히 인식하는 시스템에 관한 것이다.",
    claims:
      "1. 라이다 포인트 클라우드를 획득하는 단계; 2. 카메라 이미지와 정합하는 단계; 3. 객체를 분류하는 단계.",
    specification:
      "본 시스템은 센서 융합 알고리즘을 통해 단일 센서 대비 인식 정확도를 크게 향상시킨다...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
      { url: "https://placehold.co/600x400?text=Fig.3", alt: "도면 3" },
    ],
  },
  {
    id: 9,
    patentNumber: "10-2023-0056432",
    title: "리튬이온 배터리 급속충전 제어 방법",
    applicant: "삼성SDI",
    inventor: "오태양",
    techCategory: "배터리 관리",
    status: "심사중(Pending)",
    summary:
      "본 발명은 배터리 열화를 최소화하면서 충전 시간을 단축하는 다단계 급속충전 제어 방법에 관한 것이다.",
    claims: "1. 배터리 SOC 구간별 충전 전류를 차등 적용하는 단계를 포함하는 방법.",
    specification:
      "본 발명은 SOC 20~80% 구간에서 고전류를, 그 외 구간에서 저전류를 적용하여 배터리 셀 손상을 방지한다...",
    drawings: [{ url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" }],
  },
  {
    id: 10,
    patentNumber: "10-2021-0176543",
    title: "클라우드 환경에서의 컨테이너 오케스트레이션 방법",
    applicant: "카카오",
    inventor: "임하늘",
    techCategory: "클라우드 컴퓨팅",
    status: "등록(Registered)",
    summary:
      "본 발명은 마이크로서비스 아키텍처 환경에서 컨테이너의 자원 사용량을 예측하여 동적으로 스케일링하는 방법에 관한 것이다.",
    claims:
      "1. 컨테이너별 자원 사용 이력을 수집하는 단계; 2. 예측 모델로 향후 부하를 산출하는 단계; 3. 인스턴스를 조정하는 단계.",
    specification:
      "본 발명은 시계열 예측 모델을 활용하여 트래픽 급증 전에 선제적으로 자원을 확보한다...",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
    ],
  },
];