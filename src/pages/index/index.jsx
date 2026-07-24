import { useNavigate } from "react-router-dom";
import { Title, Text, Button, SearchBox } from "../../components/common";

function IndexPage() {
  const navigate = useNavigate();
  const suggestions = [
    "등록된 재미있는 특허는 어떤 것이 있을까?",
    "최신 기술 분야에서 주목받는 특허는 무엇이야?",
    "특허 출원 과정은 어떻게 이루어지는지 궁금해!",
  ];

  function goToChat(message) {
    navigate("/chat", { state: { initialMessage: message } });
  }

  return (
    <main className="landing">
    <div className="landing-scroll">
       <header className="landing-header">
        <Text variant="lg" weight="regular">
          Patchat만의 특허관련 DB와 AI채팅을 통해 다양한 특허 탐색을 제공합니다.
         </Text>
         <Button rounded={true} className="btn-primary">비지니스 제안 문의</Button>
       </header>

       <section className="landing-hero">
         <div className="hero-text">
           <Text variant="xl" weight=" medium">
             무한한 가능성을 여는 새로운 대화의 시작
           </Text>
           <Title level={1}>PATCHAT</Title>
           <Text className="sub">특허에 관한 모든것, Patchat와 함께 대화해 보세요.</Text>
         </div>
         <ul className="suggestions">
           {suggestions.map((text, i) => (
             <li key={i}>
               <span>{i + 1}</span>
               <button onClick={() => goToChat(text)}>{text}</button>
             </li>
           ))}
         </ul>
       </section>
    </div>

     <SearchBox onSubmit={goToChat} />
    </main>
  );
}

export default IndexPage;