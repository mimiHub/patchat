import { Stack, Title, Badge } from "../../components/common";
import ChallengeList from "./ChallengeList.jsx";
import styles from "./TechTask.module.css";

function ChallengeView({
  filteredChallenges,
  visibleChallenges,
  listPageStart,
  safeChallengeIndex,
  totalListPages,
  safeListPageIndex,
  onSelectChallenge,
  onOpenPatentView,
  onListPagePrev,
  onListPageNext,
  currentChallenge,
  onChallengePrev,
  onChallengeNext,
}) {
  return (
    <Stack
      direction="row"
      gap="sm"
      align="stretch"
      fill
      className={styles.challengeSection}
    >
      <div className={styles.challengeList}>
        <ChallengeList
          filteredChallenges={filteredChallenges}
          visibleChallenges={visibleChallenges}
          listPageStart={listPageStart}
          safeChallengeIndex={safeChallengeIndex}
          totalListPages={totalListPages}
          safeListPageIndex={safeListPageIndex}
          onSelectChallenge={onSelectChallenge}
          onOpenPatentView={onOpenPatentView}
          onListPagePrev={onListPagePrev}
          onListPageNext={onListPageNext}
          currentChallenge={currentChallenge}
          onChallengePrev={onChallengePrev}
          onChallengeNext={onChallengeNext}
        />
      </div>

      {/* 상세(과제/해결) - 재사용 안 되는 화면이라 별도 컴포넌트로 안 빼고 여기 그대로 둠 */}
      <div className={styles.challengeDetail}>
        {currentChallenge ? (
          <>
            <Stack justify="between" align="baseline">
              <Title level={4}>{currentChallenge.label}</Title>
              <span className={styles.detailCount}>
                총: <strong>{currentChallenge.patentCount}건</strong>
              </span>
            </Stack>
            <div className={styles.detailList}>
              {currentChallenge.items.map((item, i) => (
                <div key={i} className={styles.detailItem}>
                  <p className={styles.detailPatentCode}>
                    {item.patentCode}
                  </p>
                  <div className={styles.detailRow}>
                    <Badge variant="outline">과제</Badge>
                    <p className={styles.detailText}>{item.task}</p>
                  </div>
                  <div className={styles.detailRow}>
                    <Badge variant="primary">해결</Badge>
                    <p className={styles.detailText}>{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className={styles.emptyState}>
            조건에 맞는 기술과제가 없어요.
          </p>
        )}
      </div>
    </Stack>
  );
}

export default ChallengeView;
