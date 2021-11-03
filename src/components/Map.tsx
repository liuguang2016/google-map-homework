import React, { useEffect, useRef, useState } from "react";
import styles from "./Map.module.scss";

interface IMap {
  mapType?: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  position?: { x: number; y: number };
}

interface IMarker {
  address: string;
  latitude: number;
  longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GooglePolyline = google.maps.Polyline;

const Map: React.FC<IMap> = ({
  mapType = google.maps.MapTypeId.ROADMAP,
  mapTypeControl = false,
  position = { x: 30.659856258462426, y: 104.0656670909727 },
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<IMarker>();
  const [homeMarker, setHomeMarker] = useState<GoogleMarker>();
  const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);
  const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);
  const [LastLineHook, setLastLineHook] = useState<GooglePolyline>();
  const initLocation = new google.maps.LatLng(position.x,position.y);

  const startMap = (): void => {
    if (!map) {
      initMap(12, initLocation);
    } else {
      setHomeMarker(addHomeMarker(initLocation));
    }
  };
  useEffect(() => {
    startMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  const initEventListener = (): void => {
    if (map) {
      google.maps.event.addListener(map, "click", function (e: any) {
        coordinateToAddress(e.latLng);
      });
    }
  };
  useEffect(initEventListener, [map]);

  const coordinateToAddress = async (coordinate: GoogleLatLng) => {
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode({ location: coordinate }, (results, status) => {
      if (status === "OK") {
        setMarker({
          address: results ? results[0].formatted_address : "",
          latitude: coordinate.lat(),
          longitude: coordinate.lng(),
        });
      }
    });
  };

  useEffect(() => {
    if (marker) {
      addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker]);

  const addMarker = (location: GoogleLatLng): void => {
    const marker: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: getIconAttributes("#000000"),
    });

    setGoogleMarkers((googleMarkers) => [...googleMarkers, marker]);

    const listenerId = marker.addListener("click", () => {
      const homePos = homeMarker?.getPosition();
      const markerPos = marker.getPosition();
      if (homePos && markerPos) {
        if (LastLineHook) {
          LastLineHook.setMap(null);
        }

        const line = new google.maps.Polyline({
          path: [
            { lat: homePos.lat(), lng: homePos.lng() },
            { lat: markerPos.lat(), lng: markerPos.lng() },
          ],
          icons: [
            {
              icon: {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
              },
              offset: "100%",
            },
          ],
          map: map,
        });

        setLastLineHook(line);
      }
    });

    setListenerIdArray((listenerIdArray) => [...listenerIdArray, listenerId]);
  };

  useEffect(() => {
    listenerIdArray.forEach((listenerId) => {
      google.maps.event.removeListener(listenerId);
    });

    setListenerIdArray([]);
    setGoogleMarkers([]);
    googleMarkers.forEach((googleMarker) => {
      const markerPosition = googleMarker.getPosition();
      if (markerPosition) {
        addMarker(markerPosition);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LastLineHook]);

  const addHomeMarker = (location: GoogleLatLng): GoogleMarker => {
    const homeMarkerConst: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
    });

    homeMarkerConst.addListener("click", () => {
      map?.panTo(location);
      map?.setZoom(6);
    });

    return homeMarkerConst;
  };

  const getIconAttributes = (iconColor: string) => {
    return {
      path: "M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z",
      fillColor: iconColor,
      fillOpacity: 0.8,
      strokeColor: "pink",
      strokeWeight: 2,
      anchor: new google.maps.Point(30, 50),
    };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    const target = ref.current;
    if (target) {
      google.maps.event.addDomListener(window, "load", () => {
        setMap(
          new google.maps.Map(target, {
            zoom: zoomLevel,
            center: address,
            mapTypeControl: mapTypeControl,
            streetViewControl: false,
            rotateControl: false,
            scaleControl: true,
            fullscreenControl: false,
            panControl: false,
            zoomControl: true,
            gestureHandling: "cooperative",
            mapTypeId: mapType,
            draggableCursor: "pointer",
          })
        );
      });
    }
  };

  return (
    <div className={styles.mapContainer}>
      <div ref={ref} className={styles.myMap}></div>
    </div>
  );
};

export default Map;
