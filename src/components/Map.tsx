import React, { useEffect, useRef, useState } from "react";
import { createCustomEqual } from "fast-equals";
import styles from "./Map.module.scss";
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onRightClick?: ({ map }: { map: google.maps.Map }) => void;
  onIdle?: (map: google.maps.Map) => void;
  onFillColor?: () => void;
}

const Map: React.FC<MapProps> = ({ onClick, onIdle, onRightClick, onFillColor, children, style, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle", "mousedown"].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }

      if (onRightClick) {
        map.addListener("mousedown", (e: any) => {
          if (e.domEvent.button === 2) {
            onRightClick({ map });
          }
        });
      }
    }
  }, [map, onClick, onIdle, onRightClick]);

  useEffect(() => {
    if (map) {
      const fillButton = document.createElement("button");
      fillButton.textContent = "Fill Color";
      fillButton.classList.add(styles.customButton);
      fillButton.addEventListener("click", () => {
        onFillColor && onFillColor();
      });
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(fillButton);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
  if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }

  return deepEqual(a, b);
});

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function isLatLngLiteral(obj: any): obj is google.maps.LatLngLiteral {
  return typeof obj === "object" && Number.isFinite(obj.lat) && Number.isFinite(obj.lng);
}

export { Map, Marker };
