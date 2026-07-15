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
];
function getSampleResponse(question) {
  return {
    texts: [
      `"${question}"에 대한 검색 결과입니다. QLC 및 TLC 관련 기술에 대한 특허를 검색하기 위해 다음과 같은 검색조건을 설정하겠습니다.`,
      "특허컬렉션: 어떤 국가나 지역의 특허를 검색할지 알려주세요.",
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