import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mapboxgl from 'react-map-gl/src/utils/mapboxgl';

mapboxgl.accessToken='pk.eyJ1IjoiYXp0ZWNraW5kIiwiYSI6ImNrbTB2NDA2bTAxeDQzMW12bHM5Zng0ZDkifQ.M2ow_v8f3muxTlnYeWWFgA';

const Map = () => {
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
      setLatitude(map.getCenter().latitude.toFixed(4));
      setLongitude(map.getCenter().longitude.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  return(
    <div>
      <div className="sidebar">
        Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
