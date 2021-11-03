import React from "react";
import styles from "./MapLayout.module.scss";
import GoogleMap from "./GoogleMap";
import MarkerList from "./MarkerList";

const MapLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <GoogleMap />
      </div>
      <div className={styles.right}>
        <MarkerList />
      </div>
    </div>
  );
};

export default MapLayout;
