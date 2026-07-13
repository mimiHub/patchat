import { useNavigate } from "react-router-dom";
import Title from "../../components/common/Title"; 

function IndexPage() {
  const navigate = useNavigate();

  const suggestions = [
    "등록된 재미있는 특허는 어떤 것이 있을까?",
    "최신 기술 분야에서 주목받는 특허는 무엇이야?",
    "특허 출원 과정은 어떻게 이루어지는지 궁금해!",
  ];

  return (
    <main className="landing">
      <header className="landing-header">
        <Title level={2} weight="regular">
          NEVAS만의 특허관련 DB와 AI채팅을 통해 다양한 특허 탐색을 제공합니다.
        </Title>
        <button className="btn-primary">비지니스 제안 문의</button>
      </header>

      <section className="landing-hero">
        <div className="hero-text">
          <Title level={2} weight="regular">
            무한한 가능성을 여는 새로운 대화의 시작
          </Title>
          <Title  level={1}>NEVAS</Title>
          <p className="sub">특허에 관한 모든것, Nevas와 함께 대화해 보세요.</p>
        </div>

        <ul className="suggestions">
          {suggestions.map((text, i) => (
            <li key={i}>
              <span>{i + 1}</span>
              <button onClick={() => navigate("/chat")}>{text}</button>
            </li>
          ))}
        </ul>
      </section>

      <div className="search-box">
        <input placeholder="무엇이든 물어보세요." />
        <button onClick={() => navigate("/chat")}>검색</button>
      </div>
    </main>
  );
}

export default IndexPage;
