import styles from "./ComingSoon.module.css";

function ComingSoon({ title = "준비중입니다", desc }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.icon}>🚧</p>
      <h2 className={styles.title}>{title}</h2>
      {desc && <p className={styles.desc}>{desc}</p>}
    </div>
  );
}

export default ComingSoon;