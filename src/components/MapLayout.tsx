import React, { useState } from "react";
import styles from "./MapLayout.module.scss";
import GoogleMap from "./GoogleMap";
import MarkerList from "./MarkerList";

const MARKER_COUNT = 5000;

const MapLayout = () => {
  const initMarker = { lat: 30.659856258462426, lng: 104.0656670909727 };
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(initMarker);
  const [markerList, setMarkerList] = useState<google.maps.LatLng[]>([]);

  const createLatLng = () => {
    const latMax = initMarker.lat + Math.random();
    const latMin = initMarker.lat - Math.random();
    const lngMax = initMarker.lng + Math.random();
    const lngMin = initMarker.lng - Math.random();
    return { lat: Math.random() * (latMax - latMin) + latMin, lng: Math.random() * (lngMax - lngMin) + lngMin };
  };

  const setRandomMarkers = () => {
    let isFull = true;
    const randomArray: { lat: number; lng: number }[] = [];
    const latLngArray: google.maps.LatLng[] = [];
    while (isFull) {
      const result = createLatLng();
      const isFind = randomArray.find((item) => item.lat === result.lat && item.lng === result.lng);
      if (!isFind) {
        randomArray.push(result);
        latLngArray.push(new google.maps.LatLng(result.lat, result.lng));
      }
      if (randomArray.length >= MARKER_COUNT) {
        isFull = false;
      }
    }
    setMarkerList(latLngArray);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <GoogleMap markerList={markerList} center={center} setMarkerList={setMarkerList} setCenter={setCenter} />
      </div>
      <div className={styles.right}>
        <MarkerList setRandomMarkers={setRandomMarkers} markerList={markerList} setCenter={setCenter} setMarkerList={setMarkerList} />
      </div>
    </div>
  );
};

export default MapLayout;
