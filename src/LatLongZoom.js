import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiYXp0ZWNraW5kIiwiYSI6ImNrbTB2NDA2bTAxeDQzMW12bHM5Zng0ZDkifQ.M2ow_v8f3muxTlnYeWWFgA";

const LatLongZoom = () => {
    const mapContainer = useRef();
    const [longitude, setLongitude] = useState(-103.46);
    const [latitude, setLatitude] = useState(44.58);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/azteckind/ckm2dl6sy0w8v17qyh3id9j8d",
            center: [longitude, latitude],
            zoom: zoom
        });

        map.on("move", () => {
            setLongitude(map.getCenter().longitude);
            setLatitude(map.getCenter().latitude);
            setZoom(map.getZoom());
        });

        return () => map.remove();
    }, []);

    return (
        <div>
            <div className="sidebar">
                Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
            </div>
            <div className="map-container" ref={mapContainer}/>
        </div>
    );
};

export default LatLongZoom;