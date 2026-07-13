import { useState } from "react";
import Button from "../../components/common/Button.jsx";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Badge from "../../components/common/Badge.jsx";
import Title from "../../components/common/Title.jsx";
import Tab from "../../components/common/Tab.jsx";
import Menu from "../../components/common/Menu.jsx";
import Tooltip from "../../components/common/Tooltip.jsx";
import Popup from "../../components/common/Popup.jsx";
import styles from "./ComponentsGuide.module.css";

const guideList = [
  { id: "button", name: "Button", category: "Basic" },
  { id: "card", name: "Card", category: "Basic" },
  { id: "input", name: "Input", category: "Basic" },
  { id: "badge", name: "Badge", category: "Basic" },
  { id: "title", name: "Title", category: "Typography" },
  { id: "tab", name: "Tab", category: "Navigation" },
  { id: "menu", name: "Menu", category: "Navigation" },
  { id: "tooltip", name: "Tooltip", category: "Feedback" },
  { id: "popup", name: "Popup", category: "Feedback" },
];

function ComponentsGuide() {
  const [selectedId, setSelectedId] = useState(guideList[0].id);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [memo, setMemo] = useState("");
  const [agree, setAgree] = useState(false);
  const [selectedOption, setSelectedOption] = useState("a");
  const [file, setFile] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {guideList.map((item) => (
          <li
            key={item.id}
            className={item.id === selectedId ? styles.itemActive : styles.item}
            onClick={() => setSelectedId(item.id)}
          >
            <p className={styles.itemTitle}>{item.name}</p>
            <p className={styles.itemCategory}>{item.category}</p>
          </li>
        ))}
      </ul>

      <div className={styles.detail}>
        {selectedId === "button" && (
          <section>
            <Title level={2}>Button</Title>
            <Title level="caption">공통 버튼 컴포넌트</Title>
            <div className={styles.previewBox}>
              <div className={styles.btnGroup}>
                <Button onClick={() => {}}>기본 버튼</Button>
                <Button onClick={() => {}} variant="secondary">
                  보조 버튼
                </Button>
                <Button onClick={() => {}} variant="danger">
                  삭제 버튼
                </Button>
              </div>
              <div className="alignSpaceBetween">
                <Button onClick={() => {}}>기본 버튼</Button>
                <Button onClick={() => {}} variant="secondary">
                  보조 버튼
                </Button>
                <Button onClick={() => {}} variant="danger">
                  삭제 버튼
                </Button>
              </div>
              <div className={styles.btnGroup}>
                <Button onClick={() => {}} fullWidth>
                  전체 너비 버튼
                </Button>
              </div>
              <div className="align-right">
                <Button onClick={() => {}}>오른쪽 정렬 버튼</Button>
              </div>
              <div className="align-left">
                <Button onClick={() => {}}>왼쪽 정렬 버튼</Button>
              </div>
              <div className="align-center">
                <Button onClick={() => {}}>중앙 정렬 버튼</Button>
              </div>
              <div className={styles.btnGroup}>
                <Button onClick={() => {}} size="sm">
                  작은 버튼
                </Button>
                <Button onClick={() => {}} size="lg">
                  큰 버튼
                </Button>
              </div>
            </div>
            <pre className={styles.codeBlock}>
              {`<Button>기본 버튼</Button>
<Button variant="secondary">보조 버튼</Button>
<Button variant="danger">삭제 버튼</Button>
<Button fullWidth>전체 너비 버튼</Button>

<div className="align-left">
  <Button>왼쪽 정렬 버튼</Button>
</div>

<div className="align-center">
  <Button>가운데 정렬 버튼</Button>
</div>

<div className="align-right">
  <Button>오른쪽 정렬 버튼</Button>
</div>`}
            </pre>
          </section>
        )}

        {selectedId === "card" && (
          <section>
            <Title level={2}>Card</Title>
            <Title level="caption">제목, 설명을 가진 카드 컴포넌트</Title>
            <div className={styles.previewBox}>
              <Card
                title="특허 검색"
                description="QLC, TLC 관련 특허를 검색합니다."
              />
              <Card
                title="특허 검색"
                description="QLC, TLC 관련 특허를 검색합니다."
                headerAction={
                  <Button onClick={() => {}} variant="secondary" size="sm">
                    더보기
                  </Button>
                }
              />
            </div>
            <pre className={styles.codeBlock}>
              {`<Card title="특허 검색" description="QLC, TLC 관련 특허를 검색합니다." />
<Card
  title="특허 검색"
  description="QLC, TLC 관련 특허를 검색합니다."
  headerAction={
    <Button onClick={() => {}} variant="secondary" size="sm">
      더보기
    </Button>
}/>
`}
            </pre>
          </section>
        )}

        {selectedId === "input" && (
          <section>
            <Title level={2}>Input</Title>
            <Title level="caption">다양한 타입의 입력 필드</Title>
            <div
              className={styles.previewBox}
              style={{
                flexDirection: "column",
                alignItems: "stretch",
                gap: "12px",
              }}
            >
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
              />
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="나이"
              />
              <Input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호"
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
              />
              <Input
                type="textarea"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모"
              />
              <Input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                label="약관에 동의합니다"
              />
              <Input
                type="radio"
                checked={selectedOption === "a"}
                onChange={() => setSelectedOption("a")}
                label="옵션 A"
              />
              <Input
                type="radio"
                checked={selectedOption === "b"}
                onChange={() => setSelectedOption("b")}
                label="옵션 B"
              />
              {/* 버전 1: 온/오프에 따라 텍스트가 바뀜 */}
              <Input
                type="switch"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                label={isDarkMode ? "다크 모드" : "라이트 모드"}
              />

              {/* 버전 2: 텍스트는 고정, 스위치만 온/오프 */}
              <Input
                type="switch"
                checked={isNotification}
                onChange={(e) => setIsNotification(e.target.checked)}
                label="알림 받기"
              />
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
              {file && (
                <p className={styles.sectionDesc}>선택된 파일: {file.name}</p>
              )}
              <Input type="submit" value="제출" onClick={() => {}} />
              <Input type="button" value="버튼" onClick={() => {}} />
            </div>
            <pre className={styles.codeBlock}>
              {`<Input type="text" value={text} onChange={handleChange} placeholder="..." />
<Input type="checkbox" checked={agree} onChange={handleChange} label="동의합니다" />
<Input type="file" onChange={handleFileChange} />`}
            </pre>
          </section>
        )}

        {selectedId === "badge" && (
          <section>
            <Title level={2}>Badge</Title>
            <Title level="caption">상태를 나타내는 작은 라벨</Title>
            <div className={styles.previewBox}>
              <div className={styles.btnGroup}>
                <Badge>기본</Badge>
                <Badge variant="success">성공</Badge>
                <Badge variant="warning">대기</Badge>
                <Badge variant="error">오류</Badge>
              </div>
            </div>
            <pre className={styles.codeBlock}>
              {`<Badge>기본</Badge>
<Badge variant="success">성공</Badge>
<Badge variant="warning">대기</Badge>
<Badge variant="error">오류</Badge>`}
            </pre>
          </section>
        )}

        {selectedId === "title" && (
          <section>
            <Title level={2}>Title</Title>
            <Title level="caption">레벨별 제목 컴포넌트</Title>
            <div
              className={styles.previewBox}
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Title level={1}>제목 1 (h1)</Title>
              <Title level={2}>제목 2 (h2)</Title>
              <Title level={3}>제목 3 (h3)</Title>
              <hr />
              <Title level={1}>제목 1</Title>
              <Title level="body">
                일반 본문 텍스트입니다. 여러 줄로 이어지는 설명에 사용해요.
              </Title>
              <Title level="caption">작은 설명/캡션 텍스트</Title>
              <Title level={2} action={<Badge variant="success">완료</Badge>}>
                프로젝트 현황
              </Title>
              <Title
                className="fullWidth"
                level={1}
                action={
                  <Button variant="secondary" size="sm">
                    완료
                  </Button>
                }
              >
                타이틀 1
              </Title>
            </div>
            <pre className={styles.codeBlock}>
              {`<Title level={1}>제목 1 (h1)</Title>
<Title level={2}>제목 2 (h2)</Title>
<Title level={3}>제목 3 (h3)</Title>
<Title level={1}>제목 1</Title>
<Title level="body">
  일반 본문 텍스트입니다. 여러 줄로 이어지는 설명에 사용해요.
</Title>
<Title level="caption">작은 설명/캡션 텍스트</Title>
<Title level={2} 
action={<Badge variant="success">완료</Badge>}>
프로젝트 현황
</Title>`}
            </pre>
          </section>
        )}

        {selectedId === "tab" && (
          <section>
            <Title level={2}>Tab</Title>
            <Title level="caption">클릭으로 전환되는 탭 메뉴</Title>
            <div className={styles.previewBox}>
              <Tab
                tabs={[
                  {
                    label: "개요",
                    content: <p>여기에 개요 내용이 들어갑니다.</p>,
                  },
                  {
                    label: "상세",
                    content: <p>여기에 상세 내용이 들어갑니다.</p>,
                  },
                  {
                    label: "리뷰",
                    content: <p>여기에 리뷰 내용이 들어갑니다.</p>,
                  },
                ]}
              />
            </div>
            <pre className={styles.codeBlock}>
              {`<Tab
  tabs={[
    { label: "개요", content: <p>개요 내용</p> },
    { label: "상세", content: <p>상세 내용</p> },
  ]}
/>`}
            </pre>
          </section>
        )}

        {selectedId === "menu" && (
          <section>
            <Title level={2}>Menu</Title>
            <Title level="caption">클릭하면 펼쳐지는 드롭다운 메뉴</Title>
            <div className={styles.previewBox}>
              <Menu
                label="옵션"
                items={[
                  { label: "수정", onClick: () => alert("수정 클릭") },
                  { label: "복제", onClick: () => alert("복제 클릭") },
                  { label: "삭제", onClick: () => alert("삭제 클릭") },
                ]}
              />
            </div>
            <pre className={styles.codeBlock}>
              {`<Menu
  label="옵션"
  items={[
    { label: "수정", onClick: handleEdit },
    { label: "삭제", onClick: handleDelete },
  ]}
/>`}
            </pre>
          </section>
        )}

        {selectedId === "tooltip" && (
          <section>
            <Title level={2}>Tooltip</Title>
            <Title level="caption">마우스를 올리면 표시되는 설명</Title>
            <div
              className={styles.previewBox}
              style={{ gap: "var(--spacing-8)", alignItems: "center" }}
            >
              <Tooltip text="위쪽 설명">
                <Button onClick={() => {}}>Top</Button>
              </Tooltip>
              <Tooltip text="아래쪽 설명" position="bottom">
                <Button onClick={() => {}}>Bottom</Button>
              </Tooltip>
              <Tooltip text="왼쪽 설명" position="left">
                <Button onClick={() => {}}>Left</Button>
              </Tooltip>
              <Tooltip text="오른쪽 설명" position="right">
                <Button onClick={() => {}}>Right</Button>
              </Tooltip>
            </div>
            <pre className={styles.codeBlock}>
              {`
<Tooltip text="위쪽 설명">
  <Button onClick={() => {}}>Top</Button>
</Tooltip>
<Tooltip text="아래쪽 설명" position="bottom">
  <Button onClick={() => {}}>Bottom</Button>
</Tooltip>
<Tooltip text="왼쪽 설명" position="left">
  <Button onClick={() => {}}>Left</Button>
</Tooltip>
<Tooltip text="오른쪽 설명" position="right">
  <Button onClick={() => {}}>Right</Button>
</Tooltip>
              `}
            </pre>
          </section>
        )}

        {selectedId === "popup" && (
          <section>
            <Title level={2}>Popup</Title>
            <Title level="caption">버튼 클릭으로 열리는 모달 팝업</Title>
            <div className={styles.previewBox}>
              <div className="">
                <Button onClick={() => setIsPopupOpen(true)}>팝업 열기</Button>
              </div>
            </div>
            <pre className={styles.codeBlock}>
              {`<Popup isOpen={isOpen} onClose={handleClose} title="알림">
  <p>내용을 여기에 넣습니다.</p>
</Popup>`}
            </pre>

            <Popup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              title="알림"
            >
              <p>정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
              <div
                className="align-right"
                style={{ marginTop: "16px", gap: "8px" }}
              >
                <Button
                  onClick={() => setIsPopupOpen(false)}
                  variant="secondary"
                >
                  확인
                </Button>
                <Button onClick={() => setIsPopupOpen(false)} variant="danger">
                  취소
                </Button>
              </div>
            </Popup>
          </section>
        )}
      </div>
    </div>
  );
}

export default ComponentsGuide;
