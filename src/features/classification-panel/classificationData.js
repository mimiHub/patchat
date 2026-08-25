// ---------------------------------------------
// IPC (영문) - International Patent Classification, English
// ---------------------------------------------
export const ipcEnTree = [
  {
    code: "A",
    label: "HUMAN NECESSITIES",
    enLabel: "HUMAN NECESSITIES",
    description: "Technical fields related to basic human life and needs.",
    children: [
      {
        code: "A61",
        label: "MEDICAL OR VETERINARY SCIENCE; HYGIENE",
        enLabel: "MEDICAL OR VETERINARY SCIENCE; HYGIENE",
        description: "Medical devices and hygiene-related technologies.",
        children: [
          {
            code: "A61L",
            label:
              "METHODS OR APPARATUS FOR STERILISING MATERIALS OR OBJECTS",
            enLabel:
              "METHODS OR APPARATUS FOR STERILISING MATERIALS OR OBJECTS IN GENERAL; DISINFECTION, STERILISATION OR DEODORISATION OF AIR; CHEMICAL ASPECTS OF BANDAGES, DRESSINGS, ABSORBENT PADS OR SURGICAL ARTICLES",
            description:
              "Disinfectants, sterilisation methods, and hygienic processing of medical materials.",
            children: [
              {
                code: "A61L-002/00",
                label: "Methods or apparatus for disinfecting or sterilising",
                enLabel:
                  "Aspects relating to methods or apparatus for disinfecting or sterilising materials or objects",
                description:
                  "General physical and chemical disinfection methods and apparatus.",
                children: [],
              },
            ],
          },
          {
            code: "A61B",
            label: "DIAGNOSIS; SURGERY; IDENTIFICATION",
            enLabel: "DIAGNOSIS; SURGERY; IDENTIFICATION",
            description: "Diagnostic instruments and surgical devices.",
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: "B",
    label: "PERFORMING OPERATIONS; TRANSPORTING",
    enLabel: "PERFORMING OPERATIONS; TRANSPORTING",
    description:
      "Technical fields related to physical/chemical processing and transportation.",
    children: [
      {
        code: "B03",
        label: "SEPARATION OF SOLID MATERIALS",
        enLabel: "SEPARATION OF SOLID MATERIALS",
        description: "Techniques for separating solid components from mixtures.",
        children: [],
      },
      {
        code: "B60",
        label: "VEHICLES IN GENERAL",
        enLabel: "VEHICLES IN GENERAL",
        description: "General vehicle technologies including automobiles.",
        children: [],
      },
    ],
  },
  {
    code: "C",
    label: "CHEMISTRY; METALLURGY",
    enLabel: "CHEMISTRY; METALLURGY",
    description: "Manufacture and processing of chemical substances and metallurgy.",
    children: [],
  },
  {
    code: "G",
    label: "PHYSICS",
    enLabel: "PHYSICS",
    description: "Technical fields applying physical principles.",
    children: [
      {
        code: "G06",
        label: "COMPUTING; CALCULATING; COUNTING",
        enLabel: "COMPUTING; CALCULATING; COUNTING",
        description: "Computing and data processing technologies.",
        children: [
          {
            code: "G06F",
            label: "ELECTRIC DIGITAL DATA PROCESSING",
            enLabel: "ELECTRIC DIGITAL DATA PROCESSING",
            description: "Electrical devices and methods for digital data processing.",
            children: [],
          },
          {
            code: "G06N",
            label: "COMPUTING ARRANGEMENTS BASED ON SPECIFIC COMPUTATIONAL MODELS",
            enLabel:
              "COMPUTING ARRANGEMENTS BASED ON SPECIFIC COMPUTATIONAL MODELS",
            description: "Machine learning, neural networks, and AI models.",
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: "H",
    label: "ELECTRICITY",
    enLabel: "ELECTRICITY",
    description: "Basic electrical technical fields.",
    children: [
      {
        code: "H04",
        label: "ELECTRIC COMMUNICATION TECHNIQUE",
        enLabel: "ELECTRIC COMMUNICATION TECHNIQUE",
        description: "Wireless and wired communication technologies.",
        children: [
          {
            code: "H04W",
            label: "WIRELESS COMMUNICATION NETWORKS",
            enLabel: "WIRELESS COMMUNICATION NETWORKS",
            description: "Wireless communication protocols and network architecture.",
            children: [],
          },
          {
            code: "H04L",
            label: "TRANSMISSION OF DIGITAL INFORMATION",
            enLabel: "TRANSMISSION OF DIGITAL INFORMATION",
            description: "Digital signal transmission methods and protocols.",
            children: [],
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------
// IPC (한글) - International Patent Classification, Korean
// ---------------------------------------------
export const ipcKoTree = [
  {
    code: "A",
    label: "생활필수품",
    enLabel: "HUMAN NECESSITIES",
    description: "인간의 기본적 생활과 관련된 기술 분야입니다.",
    children: [
      {
        code: "A61",
        label: "의료, 위생학",
        enLabel: "MEDICAL OR VETERINARY SCIENCE; HYGIENE",
        description: "의료 기기, 위생 관련 기술을 포함합니다.",
        children: [
          {
            code: "A61L",
            label: "재료, 물품 또는 표면의 소독; 의료용 붕대 등",
            enLabel:
              "METHODS OR APPARATUS FOR STERILISING MATERIALS OR OBJECTS IN GENERAL; DISINFECTION, STERILISATION OR DEODORISATION OF AIR; CHEMICAL ASPECTS OF BANDAGES, DRESSINGS, ABSORBENT PADS OR SURGICAL ARTICLES",
            description:
              "소독제, 살균 방법, 의료용 재료의 위생 처리 기술을 다룹니다.",
            children: [
              {
                code: "A61L-002/00",
                label: "일반적인 소독 방법 또는 장치",
                enLabel:
                  "Aspects relating to methods or apparatus for disinfecting or sterilising materials or objects",
                description:
                  "물리적, 화학적 방법을 이용한 일반적인 소독 방법 및 장치에 관한 분류입니다.",
                children: [],
              },
            ],
          },
          {
            code: "A61B",
            label: "진단; 외과수술; 개인 식별",
            enLabel: "DIAGNOSIS; SURGERY; IDENTIFICATION",
            description: "진단 기기 및 외과 수술 장치를 다룹니다.",
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: "B",
    label: "처리조작",
    enLabel: "PERFORMING OPERATIONS; TRANSPORTING",
    description: "물리적, 화학적 처리 및 운송과 관련된 기술 분야입니다.",
    children: [
      {
        code: "B03",
        label: "고체 물질의 분리",
        enLabel: "SEPARATION OF SOLID MATERIALS",
        description: "혼합물에서 고체 성분을 분리하는 기술입니다.",
        children: [],
      },
      {
        code: "B60",
        label: "일반 차량",
        enLabel: "VEHICLES IN GENERAL",
        description: "자동차를 포함한 일반적인 차량 기술입니다.",
        children: [],
      },
    ],
  },
  {
    code: "C",
    label: "화학, 야금",
    enLabel: "CHEMISTRY; METALLURGY",
    description: "화학 물질의 제조, 처리 및 야금 기술 분야입니다.",
    children: [],
  },
  {
    code: "G",
    label: "물리학",
    enLabel: "PHYSICS",
    description: "물리적 원리를 응용한 기술 분야입니다.",
    children: [
      {
        code: "G06",
        label: "계산, 연산, 계수",
        enLabel: "COMPUTING; CALCULATING; COUNTING",
        description: "컴퓨팅 및 데이터 처리 기술입니다.",
        children: [
          {
            code: "G06F",
            label: "전기적 디지털 데이터 처리",
            enLabel: "ELECTRIC DIGITAL DATA PROCESSING",
            description: "디지털 데이터의 전기적 처리 장치 및 방법입니다.",
            children: [],
          },
          {
            code: "G06N",
            label: "특정 계산 모델 기반의 컴퓨팅 장치",
            enLabel:
              "COMPUTING ARRANGEMENTS BASED ON SPECIFIC COMPUTATIONAL MODELS",
            description: "머신러닝, 신경망, AI 모델 관련 기술입니다.",
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: "H",
    label: "전기",
    enLabel: "ELECTRICITY",
    description: "전기 관련 기초 기술 분야입니다.",
    children: [
      {
        code: "H04",
        label: "전기통신 기술",
        enLabel: "ELECTRIC COMMUNICATION TECHNIQUE",
        description: "무선 및 유선 통신 기술을 포함합니다.",
        children: [
          {
            code: "H04W",
            label: "무선 통신 네트워크",
            enLabel: "WIRELESS COMMUNICATION NETWORKS",
            description: "무선 통신 프로토콜 및 네트워크 구조 기술입니다.",
            children: [],
          },
          {
            code: "H04L",
            label: "디지털 정보의 전송",
            enLabel: "TRANSMISSION OF DIGITAL INFORMATION",
            description: "디지털 신호 전송 방식 및 프로토콜 기술입니다.",
            children: [],
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------
// CPC (영문) - Cooperative Patent Classification, English
// IPC를 기반으로 하되, CPC 고유 세부 그룹(예: Y02 - 기후변화 대응 기술)을 포함
// ---------------------------------------------
export const cpcEnTree = [
  {
    code: "A",
    label: "HUMAN NECESSITIES",
    enLabel: "HUMAN NECESSITIES",
    description: "CPC section for human necessities, aligned with IPC section A.",
    children: [
      {
        code: "A61B",
        label: "DIAGNOSIS; SURGERY; IDENTIFICATION",
        enLabel: "DIAGNOSIS; SURGERY; IDENTIFICATION",
        description: "Diagnostic and surgical device classifications.",
        children: [],
      },
    ],
  },
  {
    code: "G",
    label: "PHYSICS",
    enLabel: "PHYSICS",
    description: "CPC section for physics, aligned with IPC section G.",
    children: [
      {
        code: "G06N",
        label: "COMPUTING ARRANGEMENTS BASED ON SPECIFIC COMPUTATIONAL MODELS",
        enLabel:
          "COMPUTING ARRANGEMENTS BASED ON SPECIFIC COMPUTATIONAL MODELS",
        description: "Machine learning and neural network computing models.",
        children: [
          {
            code: "G06N-003/00",
            label: "Computing arrangements based on biological models",
            enLabel:
              "Computing arrangements based on biological models, e.g. neural networks",
            description: "Neural network based computing architectures.",
            children: [],
          },
        ],
      },
    ],
  },
  {
    code: "H",
    label: "ELECTRICITY",
    enLabel: "ELECTRICITY",
    description: "CPC section for electricity, aligned with IPC section H.",
    children: [
      {
        code: "H04W",
        label: "WIRELESS COMMUNICATION NETWORKS",
        enLabel: "WIRELESS COMMUNICATION NETWORKS",
        description: "Wireless network protocols and architecture.",
        children: [],
      },
    ],
  },
  {
    code: "Y",
    label: "GENERAL TAGGING OF NEW TECHNOLOGICAL DEVELOPMENTS",
    enLabel: "GENERAL TAGGING OF NEW TECHNOLOGICAL DEVELOPMENTS",
    description:
      "CPC-specific section for cross-sectional technologies not present in IPC.",
    children: [
      {
        code: "Y02",
        label: "TECHNOLOGIES FOR MITIGATION OF CLIMATE CHANGE",
        enLabel: "TECHNOLOGIES FOR MITIGATION OF CLIMATE CHANGE",
        description:
          "Renewable energy, carbon capture, and other climate mitigation technologies.",
        children: [
          {
            code: "Y02E-010/00",
            label: "Energy generation through renewable energy sources",
            enLabel:
              "Energy generation through renewable energy sources, e.g. solar, wind, geothermal",
            description:
              "Classification for renewable energy generation technologies.",
            children: [],
          },
        ],
      },
      {
        code: "Y04",
        label: "INFORMATION OR COMMUNICATION TECHNOLOGIES",
        enLabel:
          "INFORMATION OR COMMUNICATION TECHNOLOGIES HAVING AN IMPACT ON OTHER TECHNOLOGY AREAS",
        description: "Cross-domain ICT technologies including smart grids.",
        children: [],
      },
    ],
  },
];

// 세 시스템을 탭 순서(IPC영문, IPC한글, CPC영문)에 맞춰 배열로도 제공
export const classificationSystems = [ipcEnTree, ipcKoTree, cpcEnTree];

// 하위 호환용 - 기존에 이 이름으로 import하던 곳이 있으면 계속 동작하도록 유지
export const classificationTree = ipcKoTree;

// 선택된 코드까지의 전체 경로(조상 노드들 포함)를 배열로 반환
export function findPathToNode(tree, targetCode, path = []) {
  for (const node of tree) {
    const newPath = [...path, node];
    if (node.code === targetCode) return newPath;
    if (node.children && node.children.length > 0) {
      const found = findPathToNode(node.children, targetCode, newPath);
      if (found) return found;
    }
  }
  return null;
}