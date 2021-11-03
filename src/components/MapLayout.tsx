import React from "react";
import styles from "./MapLayout.module.scss";
import GoogleMap from "./GoogleMap";
import MarkerList from "./MarkerList";

const MapLayout = () => {
  const [map] = GoogleMap.useMap()
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <GoogleMap map={map}/>
      </div>
      <div className={styles.right}>
        {/* <MarkerList googleMap={map}/> */}
      </div>
    </div>
  );
};

export default MapLayout;
