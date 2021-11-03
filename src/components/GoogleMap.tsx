import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Map, Marker } from "./Map";
const MARKER_COUNT = 5000;

export type MapHooks = {
  markerList: google.maps.LatLng[];
  setRandomMarkers: () => void;
}
type Props = {
  map?: MapHooks;
}

const useMap = (map?:MapHooks):[MapHooks] => {
  const mapRef = useRef<any>();
  if (!mapRef.current) {
    if (map) {
      mapRef.current = map
    } else {
      mapRef.current = {}
    }
  }
  return [mapRef.current]
}

const MapComponent = ({ map }: Props) => {
  const initMarker = { lat: 30.659856258462426, lng: 104.0656670909727 };
  const initLatLng = new google.maps.LatLng(initMarker.lat, initMarker.lng);
  const [markerList, setMarkerList] = useState<google.maps.LatLng[]>([initLatLng]);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(initMarker);
  // const [mapHooks] = useMap(map);

  const createLatLng = () => {
    const latMax = 30.779267721150493;
    const latMin = 30.513927560368842;
    const lngMax = 103.72384789869619;
    const lngMin = 104.43151251020423;
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

  // useEffect(() => {
    // mapHooks.markerList = markerList;
    // mapHooks.setRandomMarkers = setRandomMarkers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

  return (
    <Wrapper apiKey={""} render={render}>
      <Map center={center} onClick={onClick} onIdle={onIdle} zoom={zoom} style={{ flexGrow: "1", height: "100%" }}>
        {markerList.map((latLng, i) => (
          <Marker key={i} position={latLng} />
        ))}
      </Map>
    </Wrapper>
  );
};

type GoogleMapProps = typeof MapComponent;
interface MapProps extends GoogleMapProps {
  useMap: typeof useMap;
}

const GoogleMap = MapComponent as MapProps;
GoogleMap.useMap = useMap;

export default GoogleMap;
