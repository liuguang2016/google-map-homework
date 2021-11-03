import { useState } from "react";
import styles from "./MarkerList.module.scss";

const MarkerList = () => {
  const [list, setList] = useState<any[]>([]);
  const handleSetList = () => {
    const result = [...Array(5000)];
    setList(result);
  };
  return (
    <div className={styles.listBox}>
      <div className={styles.headerBox}>
        <button
          onClick={handleSetList}
        >
          获取Markers
        </button>
      </div>
      <div className={styles.contextBox}>
        {list.map((item, idx) => {
          return <div key={idx} className={styles.card}>{idx}</div>;
        })}
      </div>
    </div>
  );
};

export default MarkerList;
