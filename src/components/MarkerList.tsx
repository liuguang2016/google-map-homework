import { MapHooks } from "./GoogleMap";
import styles from "./MarkerList.module.scss";

const MarkerList = ({ googleMap }: { googleMap: MapHooks }) => {
  const { markerList, setRandomMarkers } = googleMap;
  const handleSetList = () => {
    setRandomMarkers();
  };
  
  return (
    <div className={styles.listBox}>
      <div className={styles.headerBox}>
        <button onClick={handleSetList}>获取Markers</button>
      </div>
      <div className={styles.contextBox}>
        {markerList.map((item, idx) => {
          return (
            <div key={idx} className={styles.card}>
              {idx}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarkerList;
