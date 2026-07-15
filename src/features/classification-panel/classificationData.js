export const classificationTree = [
  {
    code: "A",
    label: "생활필수품",
    description: "인간의 기본적 생활과 관련된 기술 분야입니다.",
    children: [
      {
        code: "A61",
        label: "의료, 위생학",
        description: "의료 기기, 위생 관련 기술을 포함합니다.",
        children: [
          {
            code: "A61L",
            label: "재료, 물품 또는 표면의 소독; 의료용 붕대 등",
            description:
              "소독제, 살균 방법, 의료용 재료의 위생 처리 기술을 다룹니다.",
            children: [
              {
                code: "A61L-002/00",
                label: "일반적인 소독 방법 또는 장치",
                description:
                  "물리적, 화학적 방법을 이용한 일반적인 소독 방법 및 장치에 관한 분류입니다.",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "B",
    label: "처리조작",
    description: "물리적, 화학적 처리 및 운송과 관련된 기술 분야입니다.",
    children: [
      {
        code: "B03",
        label: "고체 물질의 분리",
        description: "혼합물에서 고체 성분을 분리하는 기술입니다.",
        children: [],
      },
    ],
  },
  {
    code: "C",
    label: "화학, 야금",
    description: "화학 물질의 제조, 처리 및 야금 기술 분야입니다.",
    children: [],
  },
  {
    code: "G",
    label: "물리학",
    description: "물리적 원리를 응용한 기술 분야입니다.",
    children: [
      {
        code: "G06",
        label: "계산, 연산, 계수",
        description: "컴퓨팅 및 데이터 처리 기술입니다.",
        children: [
          {
            code: "G06F",
            label: "전기적 디지털 데이터 처리",
            description: "디지털 데이터의 전기적 처리 장치 및 방법입니다.",
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: "H",
    label: "전기",
    description: "전기 관련 기초 기술 분야입니다.",
    children: [
      {
        code: "H04",
        label: "전기통신 기술",
        description: "무선 및 유선 통신 기술을 포함합니다.",
        children: [
          {
            code: "H04W",
            label: "무선 통신 네트워크",
            description: "무선 통신 프로토콜 및 네트워크 구조 기술입니다.",
            children: [],
          },
          {
            code: "H04L",
            label: "디지털 정보의 전송",
            description: "디지털 신호 전송 방식 및 프로토콜 기술입니다.",
            children: [],
          },
        ],
      },
    ],
  },
];