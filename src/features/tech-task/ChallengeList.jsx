import { Tooltip } from "../../components/common";
import styles from "./TechTask.module.css";

function ChallengeRow({ challenge, isActive, onSelect, onOpenPatentView }) {
  return (
    <button
      type="button"
      className={`${styles.challengeRow} ${
        isActive ? styles.challengeRowActive : ""
      }`}
      onClick={onSelect}
    >
      <span className={styles.challengeLabelGroup}>
        <span className={styles.challengeTag}>해결 수단</span>
        <span className={styles.challengeLabel}>
          {challenge.label}
          <span className={styles.challengeCount}>
            {" "}
            (특허: {challenge.patentCount}건)
          </span>
        </span>
      </span>
      <span className={styles.challengeActions}>
        <Tooltip text="특허상세보기로 가기" position="left">
          <span
            role="button"
            tabIndex={0}
            className={styles.hamburgerBtn}
            onClick={(e) => {
              e.stopPropagation();
              onOpenPatentView();
            }}
            aria-label="특허상세보기로 가기"
          >
            ☰
          </span>
        </Tooltip>
      </span>
    </button>
  );
}

function PageNav({ current, total, onPrev, onNext, ariaLabel }) {
  return (
    <div className={styles.itemPagination}>
      <button
        type="button"
        className={styles.pageArrow}
        onClick={onPrev}
        disabled={current === 0}
        aria-label={`이전 ${ariaLabel}`}
      >
        ‹
      </button>
      <span className={styles.pageIndicator}>
        {current + 1} / {total}
      </span>
      <button
        type="button"
        className={styles.pageArrow}
        onClick={onNext}
        disabled={current === total - 1}
        aria-label={`다음 ${ariaLabel}`}
      >
        ›
      </button>
    </div>
  );
}

function ChallengeList({
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
  if (filteredChallenges.length === 0) {
    return (
      <p className={styles.emptyState}>
        조건에 맞는 기술과제가 없어요. 필터를 조정해보세요.
      </p>
    );
  }

  return (
    <>
      {/* PC(1024px 이상) - 전체 리스트, 클릭해서 선택 */}
      <div className={styles.challengeListFull}>
        {visibleChallenges.map((challenge, i) => {
          const index = listPageStart + i;
          return (
            <ChallengeRow
              key={challenge.id}
              challenge={challenge}
              isActive={index === safeChallengeIndex}
              onSelect={() => onSelectChallenge(index)}
              onOpenPatentView={() => {
                onSelectChallenge(index);
                onOpenPatentView();
              }}
            />
          );
        })}

        {totalListPages > 1 && (
          <PageNav
            current={safeListPageIndex}
            total={totalListPages}
            onPrev={onListPagePrev}
            onNext={onListPageNext}
            ariaLabel="페이지"
          />
        )}
      </div>

      {/* 태블릿/모바일(1023px 이하) - 카드 1개 + 페이지네이션 */}
      <div className={styles.challengeListSingle}>
        <ChallengeRow
          challenge={currentChallenge}
          isActive
          onSelect={() => {}}
          onOpenPatentView={onOpenPatentView}
        />

        {filteredChallenges.length > 1 && (
          <PageNav
            current={safeChallengeIndex}
            total={filteredChallenges.length}
            onPrev={onChallengePrev}
            onNext={onChallengeNext}
            ariaLabel="기술과제"
          />
        )}
      </div>
    </>
  );
}

export default ChallengeList;
