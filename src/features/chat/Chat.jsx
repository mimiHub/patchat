import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button, SearchBox } from "../../components/common";
import styles from "../../components/common/Button.module.css";

const PANEL_BUTTONS = [
  { type: "chart", label: "막대차트보기" },
  { type: "clusterChart", label: "클러스터차트보기" },
  { type: "patent", label: "특허상세보기" },
  { type: "classification", label: "특허분류조회" },
  { type: "GalleryList", label: "대표도면보기" },
  { type: "techTask", label: "기술과제" },
];
function getSampleResponse(question) {
  return {
    texts: [
      `"${question}"에 대한 검색 결과입니다. 특허와 관련된 분야 특허 5건을 아래와 같이 알려드립니다.`,
      `1. **KR20110000890A** - 배터리 및 이를 포함한 배터리 팩
   - 양극 및 음극을 구분할 수 있는 배터리를 구비하여 배터리 팩 조립 시 오조립 방지
   - 출원일: 2011-01-05, 출원인: 삼성에스디아이 주식회사, 로베르트보쉬`,

`2. **KR20150092170A** - 배터리 팩
   - 케이스 내 다수 전극 조립체 수납, 전기적 연결, 플라스틱 케이스 내 금속층으로 강도 보강
   - 출원일: 2015-06-29, 출원인: 삼성에스디아이 주식회사`,

`3. **KR20130108066A** - 배터리 팩 및 이를 구비한 배터리 모듈
   - 제1 및 제2 전극 조립체와 파우치를 포함하며, 전극 조립체의 위치 배치에 관한 발명
   - 출원일: 2013-09-09, 출원인: 삼성에스디아이 주식회사`,

`4. **KR20130058413A** - 배터리 팩
   - 전극 조립체, 전극단자 및 보호회로모듈이 포함된 배터리 팩 구조
   - 출원일: 2013-05-23, 출원인: 삼성에스디아이 주식회사`,

`5. **KR20100005281A** - 배터리 팩
   - 외부 충격에 의한 용접 부위 이탈 방지 및 밀폐성 향상을 위한 배터리 팩
   - 출원일: 2010-01-20, 출원인: 삼성에스디아이 주식회사`,
      `"특허컬렉션: 어떤 국가나 지역의 특허를 검색할지 알려주세요."`,
    ],
    showPanelButtons: true,
  };
}

function Chat({ onPanelOpen }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const processedKeyRef = useRef(null);

  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage && processedKeyRef.current !== location.key) {
      processedKeyRef.current = location.key;
      sendMessage(initialMessage);
    }
  }, [location.key]);

  function sendMessage(text) {
    if (!text.trim()) return;

    const response = getSampleResponse(text);

    const userMessage = { id: Date.now(), type: "sent", text };
    const aiMessage = {
      id: Date.now() + 1,
      type: "received",
      texts: response.texts,
      showPanelButtons: response.showPanelButtons,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) =>
          msg.type === "sent" ? (
            <div className="message sent" key={msg.id}>
              <div className="chat-bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          ) : (
            <div className="message received" key={msg.id}>
              <div className="chat-bubble">
                {msg.texts.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
                {msg.showPanelButtons && (
                  <div className={styles["btn-group"]}>
                    {PANEL_BUTTONS.map((btn) => (
                      <Button
                        key={btn.type}
                        variant="secondary"
                        size="sm"
                        onClick={() => onPanelOpen(btn.type)}
                      >
                        {btn.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>
      <div className="chat-footer">
        <SearchBox onSubmit={sendMessage} placeholder="무엇이든 물어보세요." />
        <p className="disclaimer">AI 생성 정보는 정확하지 않을 수 있습니다.</p>
      </div>
    </div>
  );
}

export default Chat;