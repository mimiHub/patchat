export const patentList = [
  {
    id: 1,
    patentNumber: "10-2023-0012345",
    title: "QLC 메모리 셀의 데이터 저장 방법",
    applicant: "삼성전자",
    inventor: "홍길동",
    techCategory: "반도체 메모리",
    status: "심사중(Pending)",
    filingDate: "2023.01.27",
    publicationDate: "2024.08.05",
    registrationDate: null, // 심사중이면 아직 등록일 없음
    agent: "한빛특허법인",
    ipc: "G11C 11/56",
    stats: { claimCount: 12, citationCount: 8, citedByCount: 3, familyCount: 4 },
    summary:
      "본 발명은 QLC(Quad-Level Cell) 메모리에서 데이터를 효율적으로 저장하는 방법에 관한 것이다.",
    claims:
      "1. QLC 메모리 셀에 데이터를 기록하는 단계; 2. 기록된 데이터를 검증하는 단계를 포함하는 방법.",
    specification:
      "본 발명의 상세한 설명: QLC 메모리는 셀당 4비트를 저장할 수 있어 고집적화에 유리하다. 그러나 하나의 셀에 16개의 전압 레벨을 구분해야 하므로 레벨 간 간격이 좁아지고, 읽기 오류와 데이터 보존성 저하가 발생하기 쉽다. 본 발명은 이를 해결하기 위해 데이터를 먼저 SLC 영역에 임시 기록한 뒤, 유휴 시간에 QLC 영역으로 이동시키는 2단계 기록 방식을 제안한다. 이동 과정에서는 셀별 프로그램 속도를 측정하여 전압 인가 횟수를 적응적으로 조절함으로써 전압 분포를 균일하게 만든다. 또한 기록 직후 검증 단계에서 경계 전압 근처에 위치한 셀을 별도로 표시하고, 이후 읽기 시 해당 셀에 대해서만 보정된 기준 전압을 적용한다. 실험 결과, 본 발명의 방법은 기존 방식 대비 비트 오류율을 약 35% 감소시켰으며, 고온 환경에서의 데이터 보존 기간도 1.5배 이상 연장되었다. 본 발명은 SSD, 모바일 저장장치, 데이터센터용 대용량 스토리지 등 다양한 분야에 적용될 수 있다.",
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
    filingDate: "2023.05.30",
    publicationDate: "2024.12.02",
    registrationDate: "2025.06.18",
    agent: "누리특허법인",
    ipc: "G11C 29/42",
    stats: { claimCount: 9, citationCount: 14, citedByCount: 21, familyCount: 6 },
    summary:
      "TLC(Triple-Level Cell) 플래시 메모리의 데이터 신뢰성을 향상시키는 기법에 관한 발명이다.",
    claims: "1. TLC 셀의 전압 레벨을 보정하는 단계를 포함하는 방법.",
    specification:
      "TLC 메모리는 셀당 3비트를 저장하며, 본 발명은 오류 정정 코드를 적용하여 읽기 신뢰성을 높이는 기법에 관한 것이다. 플래시 메모리는 프로그램/소거 횟수가 증가할수록 셀의 산화막이 열화되어 전압 분포가 넓어지고, 그 결과 인접 레벨 간 중첩으로 인한 오류가 늘어난다. 본 발명은 블록별 사용 이력을 기반으로 오류 가능성을 예측하고, 열화가 진행된 블록에는 정정 능력이 더 높은 LDPC 부호를 적용하는 적응형 오류 정정 방식을 제공한다. 아울러 읽기 실패 시 기준 전압을 단계적으로 이동시키며 재시도하는 대신, 학습된 전압 이동 테이블을 참조하여 한 번에 최적 전압을 선택함으로써 재시도 횟수를 줄인다. 이를 통해 읽기 지연 시간을 평균 20% 단축하는 동시에 장치 수명을 연장할 수 있다.",
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
    filingDate: "2023.08.11",
    publicationDate: "2025.02.14",
    registrationDate: null, // 심사중이면 아직 등록일 없음
    agent: "다온국제특허법률사무소",
    ipc: "G06F 12/02",
    stats: { claimCount: 15, citationCount: 11, citedByCount: 2, familyCount: 3 },
    summary:
      "낸드 플래시 메모리의 수명을 연장하기 위한 웨어 레벨링 알고리즘에 관한 것이다.",
    claims:
      "1. 각 블록의 사용 빈도를 추적하는 단계; 2. 사용 빈도에 따라 데이터를 재배치하는 단계.",
    specification:
      "웨어 레벨링은 플래시 메모리의 모든 블록이 균등하게 마모되도록 하는 기술로, 특정 블록에 쓰기가 집중되어 조기에 수명이 다하는 문제를 방지한다. 기존의 정적 웨어 레벨링은 일정 주기마다 데이터를 이동시키므로 불필요한 쓰기 증폭이 발생하는 단점이 있었다. 본 발명은 각 블록의 소거 횟수와 데이터의 갱신 빈도를 함께 고려하여, 자주 갱신되는 핫 데이터는 마모가 적은 블록에, 거의 변하지 않는 콜드 데이터는 마모가 많은 블록에 배치하는 알고리즘을 제안한다. 또한 블록 간 소거 횟수 편차가 임계값을 넘을 때에만 데이터 이동을 수행하여 쓰기 증폭을 최소화한다. 시뮬레이션 결과 블록 간 소거 횟수 편차는 기존 대비 60% 감소하였고, 전체 장치 수명은 약 1.8배 향상되었다.",
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
    filingDate: "2022.11.08",
    publicationDate: "2024.05.13",
    registrationDate: "2024.11.27",
    agent: "한빛특허법인",
    ipc: "H01M 10/613",
    stats: { claimCount: 18, citationCount: 22, citedByCount: 37, familyCount: 8 },
    summary:
      "본 발명은 전기차 배터리 팩의 온도를 실시간으로 모니터링하고 냉각/가열을 자동 제어하는 열관리 시스템에 관한 것이다.",
    claims:
      "1. 배터리 셀 온도를 센싱하는 단계; 2. 임계값 초과 시 냉각 유로를 개방하는 단계를 포함하는 방법.",
    specification:
      "본 시스템은 다수의 온도 센서와 유체 순환 회로를 포함하며, 배터리 수명 연장 및 화재 예방 효과가 있다. 전기차 배터리는 급속 충전이나 고출력 주행 시 셀 내부 온도가 급격히 상승하며, 셀 간 온도 편차가 커지면 특정 셀의 열화가 가속된다. 본 발명은 배터리 모듈 사이에 냉각 유로를 배치하고, 각 모듈에 설치된 온도 센서의 측정값을 바탕으로 유량 제어 밸브를 개별적으로 조절하여 모듈 간 온도 편차를 2도 이내로 유지한다. 또한 셀 온도 상승률이 비정상적으로 높은 경우 열폭주 전조로 판단하여 해당 모듈의 냉각을 최대로 높이고 운전자에게 경고를 전달한다. 겨울철에는 동일한 유로에 가열된 냉각수를 순환시켜 배터리를 적정 온도로 예열함으로써 저온에서의 충전 효율 저하도 개선할 수 있다.",
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
    filingDate: "2023.12.19",
    publicationDate: "2025.06.26",
    registrationDate: null, // 심사중이면 아직 등록일 없음
    agent: "세움특허법인",
    ipc: "G06T 5/70",
    stats: { claimCount: 10, citationCount: 9, citedByCount: 1, familyCount: 2 },
    summary:
      "본 발명은 합성곱 신경망을 이용하여 저조도 환경에서 촬영된 이미지의 노이즈를 효과적으로 제거하는 방법에 관한 것이다.",
    claims:
      "1. 입력 이미지를 인코더에 통과시키는 단계; 2. 노이즈 맵을 추정하는 단계; 3. 원본에서 노이즈를 감산하는 단계.",
    specification:
      "본 발명의 신경망 구조는 U-Net 기반이며, 다양한 조도 조건에서 학습된 데이터셋을 사용한다. 저조도 환경에서 촬영된 이미지는 센서 노이즈가 크게 증가하여 세부 질감이 손실되기 쉽다. 본 발명은 인코더 단계에서 노이즈 수준을 추정하는 보조 네트워크를 추가하고, 추정된 노이즈 맵을 디코더의 각 단계에 입력하여 영역별로 노이즈 제거 강도를 다르게 적용한다. 이를 통해 평탄한 영역의 노이즈는 강하게 제거하면서도 경계선과 질감이 있는 영역은 보존할 수 있다. 학습에는 동일 장면을 서로 다른 노출로 촬영한 쌍 데이터를 사용하였으며, 경량화된 모델 구조로 스마트폰에서도 실시간 처리가 가능하다. 평가 결과 PSNR 기준 기존 방법 대비 1.2dB 향상된 성능을 보였다.",
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
    filingDate: "2021.07.29",
    publicationDate: "2023.01.31",
    registrationDate: "2023.09.12",
    agent: "한빛특허법인",
    ipc: "H04B 7/06",
    stats: { claimCount: 20, citationCount: 31, citedByCount: 58, familyCount: 11 },
    summary:
      "본 발명은 5G 밀리미터파 대역에서 빔의 방향을 동적으로 조정하여 통신 품질을 향상시키는 방법에 관한 것이다.",
    claims: "1. 단말의 위치 정보를 수신하는 단계; 2. 빔 방향을 재계산하는 단계.",
    specification:
      "본 발명은 기지국과 단말 간 신호 세기를 지속적으로 측정하여 빔포밍 계수를 갱신한다. 5G 밀리미터파 대역은 전파의 직진성이 강하고 장애물에 의한 감쇠가 커서, 단말이 이동하거나 주변 환경이 바뀌면 빔이 쉽게 끊어진다. 본 발명은 단말의 이동 방향과 속도를 예측하여 다음 시점의 최적 빔 방향을 미리 계산하고, 빔 탐색 범위를 예측 방향 주변으로 좁혀 탐색 시간을 단축한다. 또한 주 빔이 차단될 경우를 대비해 반사 경로를 이용하는 보조 빔을 함께 유지하여 연결 끊김 없이 전환할 수 있도록 한다. 실측 결과 빔 재설정에 걸리는 시간이 기존 대비 70% 감소하였으며, 이동 중 평균 전송 속도도 크게 향상되었다.",
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
    filingDate: "2023.10.05",
    publicationDate: "2025.04.10",
    registrationDate: null, // 심사중이면 아직 등록일 없음
    agent: "누리특허법인",
    ipc: "G09G 3/3233",
    stats: { claimCount: 11, citationCount: 7, citedByCount: 4, familyCount: 5 },
    summary:
      "본 발명은 OLED 패널의 픽셀별 열화 정도를 추적하여 구동 전류를 보정함으로써 번인 현상을 방지하는 방법에 관한 것이다.",
    claims:
      "1. 픽셀 발광 시간을 누적 기록하는 단계; 2. 누적값에 따라 전류를 보정하는 단계.",
    specification:
      "본 발명은 픽셀 열화 모델을 기반으로 실시간 보정 알고리즘을 적용하여 화면 잔상을 최소화한다. OLED는 유기물 소자가 스스로 발광하는 구조이므로, 같은 화면이 오래 표시되면 특정 픽셀만 빠르게 열화되어 번인 현상이 나타난다. 본 발명은 각 픽셀의 누적 발광 시간과 휘도를 기록하여 열화 정도를 추정하고, 열화가 진행된 픽셀의 구동 전류를 보정하여 주변 픽셀과 동일한 밝기로 보이도록 한다. 또한 상태 표시줄이나 로고처럼 고정된 화면 요소를 감지하면 해당 영역의 휘도를 사용자가 인지하지 못할 수준으로 미세하게 낮춘다. 이러한 방식을 통해 패널 수명을 연장하고 장시간 사용 시에도 균일한 화질을 유지할 수 있다.",
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
    filingDate: "2022.12.14",
    publicationDate: "2024.06.20",
    registrationDate: "2025.01.08",
    agent: "세움특허법인",
    ipc: "G06V 40/10",
    stats: { claimCount: 16, citationCount: 19, citedByCount: 26, familyCount: 7 },
    summary:
      "본 발명은 라이다와 카메라 센서 융합을 통해 저조도 및 악천후 환경에서도 보행자를 정확히 인식하는 시스템에 관한 것이다.",
    claims:
      "1. 라이다 포인트 클라우드를 획득하는 단계; 2. 카메라 이미지와 정합하는 단계; 3. 객체를 분류하는 단계.",
    specification:
      "본 시스템은 센서 융합 알고리즘을 통해 단일 센서 대비 인식 정확도를 크게 향상시킨다. 카메라는 형태 인식에 강하지만 야간이나 악천후에 성능이 떨어지고, 라이다는 거리 측정이 정확하지만 물체의 종류를 구분하는 데 한계가 있다. 본 발명은 카메라, 라이다, 레이더의 데이터를 시간 동기화한 뒤 공통 좌표계로 변환하고, 각 센서의 신뢰도를 주변 환경에 따라 동적으로 조정하여 결합한다. 보행자로 인식된 객체에 대해서는 이동 궤적을 추적하여 도로 진입 가능성을 예측하고, 위험도가 높을 경우 차량 제어 시스템에 감속 신호를 전달한다. 야간 및 우천 조건의 시험에서 보행자 인식률은 단일 카메라 방식 대비 25% 이상 향상되었다.",
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
    filingDate: "2023.04.21",
    publicationDate: "2024.10.28",
    registrationDate: null, // 심사중이면 아직 등록일 없음
    agent: "다온국제특허법률사무소",
    ipc: "H01M 10/44",
    stats: { claimCount: 13, citationCount: 10, citedByCount: 6, familyCount: 4 },
    summary:
      "본 발명은 배터리 열화를 최소화하면서 충전 시간을 단축하는 다단계 급속충전 제어 방법에 관한 것이다.",
    claims: "1. 배터리 SOC 구간별 충전 전류를 차등 적용하는 단계를 포함하는 방법.",
    specification:
      "본 발명은 SOC 20~80% 구간에서 고전류를, 그 외 구간에서 저전류를 적용하여 배터리 셀 손상을 방지한다. 리튬이온 배터리를 높은 전류로 충전하면 음극 표면에 리튬이 석출되는 현상이 발생할 수 있으며, 이는 용량 감소와 내부 단락의 원인이 된다. 본 발명은 셀의 온도, 내부 저항, 충전 상태를 실시간으로 측정하여 리튬 석출이 일어나지 않는 최대 전류를 계산하고, 이 값을 넘지 않는 범위에서 충전 전류를 단계적으로 조절한다. 또한 충전 중 짧은 역방향 펄스를 주기적으로 인가하여 전극 표면의 리튬 이온 농도를 균일하게 만든다. 그 결과 충전 시간은 기존 대비 30% 단축되면서도 500회 충방전 후의 용량 유지율은 오히려 향상되었다.",
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
    filingDate: "2021.12.27",
    publicationDate: "2023.06.30",
    registrationDate: "2024.02.15",
    agent: "세움특허법인",
    ipc: "G06F 9/50",
    stats: { claimCount: 14, citationCount: 17, citedByCount: 33, familyCount: 5 },
    summary:
      "본 발명은 마이크로서비스 아키텍처 환경에서 컨테이너의 자원 사용량을 예측하여 동적으로 스케일링하는 방법에 관한 것이다.",
    claims:
      "1. 컨테이너별 자원 사용 이력을 수집하는 단계; 2. 예측 모델로 향후 부하를 산출하는 단계; 3. 인스턴스를 조정하는 단계.",
    specification:
      "본 발명은 시계열 예측 모델을 활용하여 트래픽 급증 전에 선제적으로 자원을 확보한다. 기존의 오토스케일링은 CPU 사용률 등이 임계값을 넘은 뒤에 컨테이너를 추가하므로, 새 컨테이너가 준비되는 동안 응답 지연이 발생하는 문제가 있었다. 본 발명은 과거 트래픽 패턴과 요일, 시간대, 이벤트 일정 등을 학습한 모델로 향후 수십 분간의 요청량을 예측하고, 필요한 컨테이너 수를 미리 계산하여 사전에 배치한다. 예측이 빗나간 경우에는 기존의 반응형 스케일링이 보완적으로 동작하도록 하여 안정성을 확보한다. 또한 트래픽이 줄어드는 구간에서는 컨테이너를 단계적으로 회수하여 클라우드 비용을 절감한다. 실제 서비스 적용 결과 피크 시간대 응답 지연이 40% 감소하였다.",
    drawings: [
      { url: "https://placehold.co/600x400?text=Fig.1", alt: "도면 1" },
      { url: "https://placehold.co/600x400?text=Fig.2", alt: "도면 2" },
    ],
  },
];