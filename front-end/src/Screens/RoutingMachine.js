import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import carIcon from '../assets/car.gif';

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
  });

export default function RoutingMachine(props) {
    const map = useMap();
  
    useEffect(() => {
        if (!map) return;
  
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(props.delivered[0], props.delivered[1]), L.latLng(props.current[0], props.current[1])],
            routeWhileDragging: true,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false,
        }).addTo(map);
        return () => map.removeControl(routingControl);
    }, [map]);
    return null;
  }
