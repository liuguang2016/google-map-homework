import React from "react";
import styles from "./MapLayout.module.scss";
import GoogleMap from "./GoogleMap";

const MapLayout = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <GoogleMap />
      </div>
      <div className={styles.right}>2</div>
    </div>
  );
};

export default MapLayout;
