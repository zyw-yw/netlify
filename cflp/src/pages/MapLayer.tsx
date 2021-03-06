import React, { useState, useEffect, useReducer, useRef } from "react";
import ReactMapGL from "react-map-gl";
import { createGlobalStyle } from "styled-components";
import { MarkerLayer, MarkersDisplay, PathLayer } from "../components";
import {
  MAPBOX_TOKEN,
  SingleMarkerProps,
  ViewportType,
  // COMPANY_TENANT,
  CLIENT_TENANT,
  USER_INFO,
} from "../common";
import { markersReducer, markersInitialState } from "../store";
import "antd/dist/antd.css";
import { Redirect } from "react-router";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none !important;
  }
  body {
    overflow: hidden;
    width: 100% !important;
  }
`;

const MapLayer = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 39.87523429950629,
    longitude: 116.47133481200402,
    zoom: 14,
  });
  const [currentPaths, setCurrentPaths] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [totalMarkers, markersDispatch] = useReducer(
    markersReducer,
    markersInitialState
  );

  const mapRef = useRef<any>(null);
  const handleViewportChange = (mk: SingleMarkerProps) => {
    setViewport({
      ...viewport,
      latitude: mk.latitude,
      longitude: mk.longitude,
    });
  };

  useEffect(() => {
    const info = window.sessionStorage.getItem(USER_INFO);
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, []);

  const map = mapRef?.current?.getMap();
  if (!userInfo) {
    return <Redirect to="/login" />;
  } else {
    return (
      <>
        <GlobalStyle />
        <MarkersDisplay
          mapInstance={map}
          currentPaths={currentPaths}
          tenantType={CLIENT_TENANT}
          currentViewport={viewport}
          onViewportChange={handleViewportChange}
          totalMarkers={totalMarkers}
          setCurrentPaths={setCurrentPaths}
          markersDispatch={markersDispatch}
        />
        <ReactMapGL
          {...viewport}
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          width="100vw"
          height="100vh"
          onViewportChange={(nextViewport: ViewportType) => {
            setViewport(nextViewport);
          }}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <MarkerLayer
            totalMarkers={totalMarkers}
            markersDispatch={markersDispatch}
          />
          <PathLayer currentPaths={currentPaths} />
        </ReactMapGL>
      </>
    );
  }
};

export default MapLayer;
