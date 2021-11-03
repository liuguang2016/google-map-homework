import styles from "./MarkerList.module.scss";

type Props = {
  markerList: google.maps.LatLng[];
  setMarkerList: (param: google.maps.LatLng[]) => void;
  setCenter: (param: google.maps.LatLngLiteral) => void;
  setRandomMarkers: () => void;
};
const MarkerList = ({ setRandomMarkers, markerList, setCenter, setMarkerList }: Props) => {
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
