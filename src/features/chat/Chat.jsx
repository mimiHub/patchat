import Button from "../../components/common/Button.jsx";
import styles from "../../components/common/Button.module.css";

function Chat({ onPanelOpen }) {
  // ← props로 받기
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="message sent">
          <div className="chat-bubble">
            <p>특허리스트를 캔버스로 보여줘</p>
          </div>
        </div>
        <div className="message received">
          <div className="chat-bubble">
            <p>
              QLC 및 TLC 관련 기술에 대한 특허를 검색하기 위해 다음과 같은
              검색조건을 설정하겠습니다.
            </p>
            <p>특허컬렉션: 어떤 국가나 지역의 특허를 검색할지 알려주세요.</p>
            <div className={styles["btn-group"]}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPanelOpen("chart")}
              >
                차트보기
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPanelOpen("patent")}
              >
                특허상세보기
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPanelOpen("accordion")}
              >
                아코디언보기
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onPanelOpen("GalleryList")}
              >
                갤러리 목록보기
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-footer">
        <div className="search-box">
          <input placeholder="무엇이든 물어보세요." />
          <button>검색</button>
        </div>
        <p className="disclaimer">AI 생성 정보는 정확하지 않을 수 있습니다.</p>
      </div>
    </div>
  );
}

export default Chat;
