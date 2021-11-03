import React, { useEffect, useState } from "react";
import Map from "./Map";
import { loadMapApi } from "../utils/GoogleMapsUtils";
import styles from "./GoogleMap.module.scss";

const GoogleMap = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", ()=>{
      setScriptLoaded(true);
    });
  }, []);


  return (
    <div className={styles.mapBox}>
      {scriptLoaded ? <Map mapTypeControl={true} />:"加载中......"}
    </div>
  );
};

export default GoogleMap;
