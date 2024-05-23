"use client";
import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import Markers from "./Markers";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

function GoogleMapView({ businessList }) {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );
  const [map, setMap] = useState<google.maps.Map>();

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  useEffect(() => {
    if (map && selectedBusiness) {
      map.panTo(selectedBusiness.geometry.location);
    }
  }, [selectedBusiness, map]);

  return (
    <div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}
        mapIds={["327f00d9bd231a33"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          // center={userLocation}

          center={
            !selectedBusiness.name
              ? userLocation
              : selectedBusiness.geometry.location
          }
          options={{ mapId: "327f00d9bd231a33" }}
          zoom={13}
          onLoad={(map) => setMap(map)}
        >
          <MarkerF
            position={userLocation}
            icon={{
              url: "/user-location.png",
              scaledSize: {
                width: 50,
                height: 50,
              } as google.maps.Size,
            }}
          />
          {businessList.map(
            (item, index) =>
              index <= 7 && <Markers business={item} key={index} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapView;
