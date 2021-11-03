import React, { useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Map, Marker } from "./Map";
import { grahamScan2 } from "@thi.ng/geom-hull";

type Props = {
  markerList: google.maps.LatLng[];
  center: google.maps.LatLngLiteral;
  setMarkerList: (param: google.maps.LatLng[]) => void;
  setCenter: (param: google.maps.LatLngLiteral) => void;
};

const GoogleMap = ({ markerList, center, setMarkerList, setCenter }: Props) => {
  // const initLatLng = new google.maps.LatLng(initMarker.lat, initMarker.lng);
  const [zoom, setZoom] = useState(12);

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    setMarkerList([...markerList, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const drawPolygon = ({map}:{map:google.maps.Map}) => {
    const transformData = markerList.map(item => {
      const { lat, lng } = item.toJSON();
      return [lat, lng];
    });
    const convexHullData = grahamScan2(transformData) as number[][];
    if (convexHullData.length > 3) {
      const bermudaTriangle = new google.maps.Polygon({
        paths: convexHullData.map(item => {
          const [lat, lng] = item;
          return {lat, lng}
        }),
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.35,
      });
      bermudaTriangle.setMap(map);
      setMarkerList([]);
    }
  };

  return (
    <Wrapper apiKey={""} render={render}>
      <Map center={center} onClick={onClick} onIdle={onIdle} onRightClick={drawPolygon} zoom={zoom} style={{ flexGrow: "1", height: "100%" }}>
        {markerList.map((latLng, i) => (
          <Marker key={i} position={latLng} />
        ))}
      </Map>
    </Wrapper>
  );
};

export default GoogleMap;
